# Спецификации API ипотечного страхования — Альфа, Абсолют, СОГАЗ

> Единая выжимка из трёх спецификаций для построения калькулятора/формы.

---

## Сводная таблица: отличия СК

| Параметр | Альфа | Абсолют | СОГАЗ |
|----------|-------|---------|-------|
| **Банки** | 21 банк: Сбер, ВТБ, Газпром, Дом.РФ, Открытие, Райффайзен, МТС, Уралсиб, МКБ, АТБ, Т-Банк, АК Барс, Юникредит, Левобережный, Примсоцбанк, Челиндбанк, Хлынов, Энергобанк, Оренбург, БМ-Банк (IDs из /mortgage/dictionary/bank/allowed) | Индивидуальный список для каждого партнёра (Сбер, ВТБ, Газпром, Дом.РФ, Открытие, Райффайзен, МТС подтверждены) | sber, vtb, rshb (только 3) |
| **Тип объекта** | FLAT, ROOM, APARTMENTS (зависит от банка) | Квартира, Апартаменты, Таунхаус, Жилой дом, ЗУ, Нежилое, Гараж, Машиноместо, Гостевой дом, Кладовка, Баня (11 типов) | flat, house, houseWithPlot, plot, room, apartments (6 типов) |
| **Риски** | Жизнь, Имущество, Титул (зависит от банка) | Жизнь, Имущество, Титул (зависит от программы) | combo (жизнь+имущество), life, property |
| **Созаёмщики** | Не более 1 (coInsurers массив) | Поддерживаются (кол-во уточнять по API) | Поддерживаются (coborrowers массив) |
| **Тип рынка** | FIRST (первичный), SECOND (вторичный) — всегда передавать SECOND | 1=Вторичное, 2=Новостройка | Не передаётся отдельно |
| **Формат дат** | YYYY-MM-DD | YYYY-MM-DD | YYYY-MM-DD |
| **Авторизация** | OAuth 2.0 (password grant) | OAuth 2.0 (client_credentials) | Bearer token |
| **Промокод** | promoCode (скидка к тарифу) | Нет данных | promotion |
| **Земельный участок** | Нет | check_object=654411 (ЗУ отдельный объект) | objectType=houseWithPlot → отдельный plot |

---

## 1. АльфаСтрахование (Alfa)

### 1.1 Авторизация

- **OAuth 2.0** (password grant)
- **Тест:** `https://b2b-test2.alfastrah.ru/msrv_dev/oauth/token`
- **Бой:** `https://b2b.alfastrah.ru/msrvg/oauth/token`
- Метод: `POST`, Content-Type: `multipart/form-data`
- Параметры: `username`, `password`, `grant_type=password`
- Токен живёт ~15 минут, обновляется через `refresh_token`

### 1.2 Справочники

| # | Эндпоинт | Назначение | Зависит от |
|---|----------|-----------|------------|
| 2 | `GET /mortgage/dictionary/bank/allowed` | Доступные банки | — |
| 3 | `GET /mortgage/dictionary/sport/bank/{bankId}` | Виды спорта | islifeRiskAvailable=true |
| 4 | `GET /mortgage/dictionary/profession/bank/{bankId}` | Профессии | islifeRiskAvailable=true |
| 5 | `GET /mortgage/dictionary/restriction/property/right` | Ограничения прав собственности | isTitleRiskAvailable=true |
| 6 | `GET /mortgage/dictionary/document/confirmation` | Документы подтверждения права собственности | isTitleRiskAvailable=true |
| 7 | `GET /mortgage/dictionary/restriction/bank/{bankId}` | Ограничения банка (возраст, сроки, доли) | — |
| 8 | `GET /mortgage/dictionary/questionary/bank/{bankId}` | Список полей анкеты (calc/save) | — |

### 1.3 Банки — ответ справочника

```json
{
  "id": 1, "code": "sber", "bankName": "СБЕРБАНК РОССИИ",
  "islifeRiskAvailable": true,
  "isPropertyRiskAvailable": true,
  "isTitleRiskAvailable": false
}
```

### 1.4 Ограничения банка — ответ справочника

| Поле | Описание |
|------|----------|
| minInsuredAge / maxInsuredAge | Мин/макс возраст для страхования (лет) |
| lifeMinInsuredAge / lifeMaxInsuredAge | Мин/макс возраст при страховании жизни |
| minInsuranceTerm / maxInsuranceTerm | Мин/макс срок для жизни/имущества (мес.) |
| titleMinInsuranceTerm / titleMaxInsuranceTerm | Мин/макс срок для титула (мес.) |
| maxSharePerInsured | Макс. доля одного застрахованного |
| totalMaxShare | Макс. сумма долей всех застрахованных |

### 1.5 Расчёт — `POST /mortgage/partner/alfa/calc`

#### Структура запроса

| Блок | Поле | Тип | Обязательно | Описание |
|------|------|-----|-------------|----------|
| root | beginDate | date | + | Дата начала полиса. Не < текущей и не > текущая+3мес |
| agent | managerId | integer | + | ID менеджера |
| agent | agentContractId | integer | + | ID агентского договора |
| mortgageAgreement | bankName | string | + | Название банка (из справочника) |
| mortgageAgreement | creditValue | double | + | Остаток долга, 100000–20000000 |
| mortgageAgreement | rate | double | по п.8 | Ставка. Райффайзен: всегда 10%! |
| mortgageAgreement | termInMonth | integer | по п.8 | Срок страхования (мес.) |
| mortgageAgreement | dateCreditDoc | date | + (Сбер: необяз.) | Дата подписания КД |
| mortgageAgreement | address.state | string | + | Регион |
| mortgageAgreement | address.city | string | + | Город |
| insuranceObject | buildingType | string | + | FLAT / ROOM / APARTMENTS |
| insuranceObject | saleType | string | + | FIRST / SECOND (всегда SECOND) |
| insuranceObject | address | Address | + | Адрес объекта (state обязателен) |
| insurer | gender | string | + | M / F |
| insurer | dateOfBirth | date | + | Дата рождения |
| insurer | share | double | по п.8 | Доля (без созаёмщиков = 100%) |
| insurer.lifeRisk | illness | boolean | по п.8 | Хронические заболевания |
| insurer.lifeRisk | professionId | integer | по п.8 | ID профессии |
| insurer.lifeRisk | sportId | integer | по п.8 | ID спорта |
| insuranceObject.propertyRisk | goruch | boolean | по п.8 | Горючесть |
| insuranceObject.propertyRisk | year | integer | по п.8 | Год постройки |
| insuranceObject.propertyRisk | capitalRepairExists | boolean | по п.8 | Был капремонт |
| insuranceObject.propertyRisk | insuranceBaseAmount | double | по п.8 | Рыночная стоимость |
| insuranceObject.propertyRisk | kadastr | string | по п.8 | Кадастровый номер |
| insuranceObject.propertyRisk | repairWorkInProgress | boolean | по п.8 | Ремонт в процессе |
| insuranceObject.propertyRisk | poolExists | boolean | по п.8 | Есть бассейн |
| insuranceObject.titleRisk | ... | ... | по п.8 | Поля титула (доверенность, возраст собственников, юр.лица, срок собственности, документы) |
| coInsurers[] | gender, dateOfBirth, share, lifeRisk | — | — | Не более 1 созаёмщика. Заполняется при страховании жизни созаёмщика |
| root | promoCode | string | — | Промокод (скидка к тарифу, не к премии) |

#### Ответ расчёта

| Поле | Описание |
|------|----------|
| lifePremium | Премия по жизни |
| propertyPremium | Премия по имуществу |
| titlePremium | Премия по титулу |
| canBeIssued | Можно ли оформить |
| underwriterMessage | Причины отказа по рискам |
| upid | ID расчёта |
| kv | Размер КВ |

### 1.6 Сохранение — `POST /mortgage/partner/alfa/contract`

Структура аналогична расчёту + дополнительные поля:

| Блок | Поле | Описание |
|------|------|----------|
| mortgageAgreement | numberCreditDoc | Номер КД (+ для не-Сбер) |
| insuranceObject | propertyArea | Площадь (double, +) |
| insurer | firstName, lastName, middleName | ФИО (+) |
| insurer | email, phone | Контакты (+) |
| insurer | address | Адрес регистрации (+) |
| insurer.personDocument | seria, number, dateOfIssue, issuedBy, issuedByUnitCode | Паспорт (+) |
| coInsurers[] | те же + address, personDocument, lifeRisk | Созаёмщик (ФИО, паспорт, адрес) |

### 1.7 Тип имущества по банкам

| Банк | FLAT | ROOM | APARTMENTS |
|------|------|------|------------|
| Сбербанк | ✅ | ✅ | ✅ |
| ВТБ | ✅ | ✅ | ✅ |
| Газпромбанк | ✅ | ✅ | ✅ |
| Дом.РФ | ✅ | ✅ | ✅ |
| Уралсиб | ✅ | ✅ | ❌ |
| Открытие | ✅ | ✅ | ❌ |
| Большинство других | ✅ | ✅ | ❌ |

> При апартаментах: доступно только страхование жизни (кроме Сбербанка)

### 1.8 Ограничения по имуществу

- Квартира — только FLAT
- Не горючие стены/перекрытия
- Год постройки не старше 1960
- Нет капремонта/перепланировки
- Нет ремонтных работ

### 1.9 Созаёмщики — Альфа

- Массив `coInsurers`, **не более 1** созаёмщика
- Обязательные поля: gender, dateOfBirth, share, lifeRisk
- При сохранении: + address, firstName, lastName, middleName, personDocument, resident
- share: доля не > maxSharePerInsured, сумма всех долей не > totalMaxShare
- Для Сбербанка: страхуется **только Заёмщик** (без созаёмщиков)
- Для Юникредита: сумма долей = 100%

### 1.10 Полный список банков Альфа

| code | Название | data-alfa (ID) | saleType | Примечание |
|------|----------|----------------|----------|------------|
| sber | Сбербанк России | 1 | SECOND | Без созаёмщиков, титул недоступен |
| vtb | ВТБ | 6 | SECOND | Только расчёт, оформление недоступно |
| gazprom | Газпромбанк | 2 | SECOND | Формула: кредит*(1+ставка/100) |
| domrf | Дом.РФ | 4 | SECOND | Титул недоступен |
| open | Открытие | 5 | SECOND | — |
| raiff | Райффайзенбанк | 10 | SECOND | Ставка всегда 10%! Формула: кредит*1.1 |
| mts | МТС-Банк | 13 | SECOND | Формула: кредит*1.1 |
| uralsib | Уралсиб | API | SECOND | APARTMENTS недоступно |
| mkb | МКБ | API | SECOND | — |
| atb | АТБ | API | SECOND | Формула: кредит*1.1 |
| tbank | Т-Банк | API | SECOND | — |
| akbars | АК Барс | API | SECOND | — |
| unicredit | Юникредит | API | SECOND | Сумма долей=100% |
| levoberezh | Левобережный | API | SECOND | Формула: кредит*1.1 |
| primsoc | Примсоцбанк | API | SECOND | — |
| chelind | Челиндбанк | API | SECOND | — |
| hlynov | Хлынов | API | SECOND | Формула: кредит*1.1 |
| energobank | Энергобанк | API | SECOND | — |
| orenburg | Оренбург | API | SECOND | — |
| bmbank | БМ-Банк | API | SECOND | Формула: кредит*1.1 |

> **Примечание:** ID банков (data-alfa) для банков, помеченных как «API», берутся из эндпоинта `/mortgage/dictionary/bank/allowed`. В форме используются placeholder-значения.

### 1.11 Формула расчёта страховой суммы

| Группа банков | Формула |
|---------------|---------|
| АТБ, БМ, Левобережный, МТС, Райффайзен, Хлынов | `кредит * 1.1` |
| АК Барс, Оренбург, Уралсиб, Дом.РФ, МКБ, Примсоцбанк, Сбер, Юникредит, Т-Банк, Челиндбанк, Энергобанк | `кредит` |
| Газпромбанк | `кредит * (1 + ставка/100)` |
| ВТБ | Недоступно для оформления |

> Если кредит > рыночной стоимости — имущество/титул считается по рыночной

---

## 2. Абсолют Страхование (Absolut)

### 2.1 Авторизация

- **OAuth 2.0** (client_credentials)
- **Тест:** `https://represtapi.absolutins.ru/ords/rest/oauth/token`
- **Базовый URL:** `https://represtapi.absolutins.ru/ords/rest/api/`
- Токен живёт 1 час

### 2.2 Справочники

| # | Эндпоинт | Назначение |
|---|----------|-----------|
| 1 | `/dicti/mortgage/countries` | Страны |
| 2 | `/dicti/mortgage/profession` | Профессии |
| 3 | `/dicti/mortgage/risk_group` | Группы рисков |
| 4 | `/dicti/mortgage/program` | Программы (индивидуально для партнёра) |
| 5 | `/dicti/mortgage/credit_bank` | Банки (устар.) |
| 6 | `/dicti/mortgage/credit_bank/details` | Банки + программы |
| 7 | `/dicti/mortgage/prev_sk` | Предыдущие СК (при смене) |
| 8 | `/dicti/mortgage/developers` | Застройщики |
| 9 | `/dicti/mortgage/alarms` | Сигнализации |
| 10 | `/dicti/mortgage/fire_sources` | Источники огня |
| 11 | `/dicti/mortgage/purpose` | Целевые назначения |
| 12 | `/dicti/mortgage/risk_factors` | Доп. факторы риска |
| 13 | `/dicti/materials` | Материалы стен (W) и перекрытий (F) |

### 2.3 Объекты страхования (`check_object`)

| # | Название | ISN |
|---|---------|-----|
| 1 | Квартира | 654391 |
| 2 | Апартаменты | 1868521 |
| 3 | Таунхаус | 1868531 |
| 4 | **Жилой дом** | 654401 |
| 5 | **Земельный участок** | 654411 |
| 6 | Нежилое помещение | 833631 |
| 8 | Гараж | 654431 |
| 9 | Машиноместо | 654421 |
| 10 | Гостевой дом | 654451 |
| 11 | Кладовка | 2008621 |
| 12 | Баня | 654441 |

### 2.4 Типы рынка (`object_type`)

| Значение | Описание |
|----------|----------|
| 1 | Вторичное жильё |
| 2 | Новостройка |

### 2.5 Цель страхования (`insurance_type` / `ins_purpose`)

| Значение | Описание | Доп. поля |
|----------|----------|-----------|
| 1 | Новый кредит | — |
| 2 | Дострахование рисков | — |
| 3 | Рефинансирование | — |
| 4 | Смена СК | `ins_previous` (ISN из справочника prev_sk) |
| 5 | Перезаключение договора | `renew_reason` (1-5) |

### 2.6 Предварительный расчёт

**`POST /mortgage/multiyear/calculation/express/create`**

Минимальные данные: программа, банк, тип объекта, тип рынка, дата начала, дата КД, сумма кредита, дата рождения, пол.

### 2.7 Полный расчёт

**`POST /mortgage/multiyear/calculation/create`**

С андеррайтингом, скорингом, проверкой ММИЛ. Ответ: `ready_to_agreement` (true/false).

### 2.8 Дополнительные параметры объекта

| Параметр | Справочник | Когда нужен |
|----------|-----------|------------|
| walls_type | `/dicti/materials` (Code=W) | Для объектов имущества |
| floors_type | `/dicti/materials` (Code=F) | Для объектов имущества |
| alarms | `/dicti/mortgage/alarms` | Для дома, ЗУ |
| fire_sources | `/dicti/mortgage/fire_sources` | Для дома, ЗУ |
| purpose | `/dicti/mortgage/purpose` | Для дома, ЗУ |
| risk_factors | `/dicti/mortgage/risk_factors` | Для дома, ЗУ |
| developers | `/dicti/mortgage/developers` | Для новостроек |

### 2.9 Давление (скоринг жизни)

| Параметр | Описание |
|----------|----------|
| pressureUp | Верхнее (систолическое) |
| pressureDown | Нижнее (диастолическое) |

### 2.10 Созаёмщики — Абсолют

- Передаются в массиве
- Те же поля что у заёмщика (ФИО, дата рождения, пол, профессия и т.д.)
- Скоринг по каждому клиенту отдельно
- Количество уточнять в Postman-коллекции

### 2.11 Полный жизненный цикл

```
1. POST /oauth/token → токен
2. GET  /dicti/mortgage/... → справочники
3. POST /mortgage/multiyear/calculation/express/create → экспресс-расчёт
4. POST /mortgage/multiyear/calculation/create → полный расчёт
5. PUT  /mortgage/multiyear/approval/send → подтверждение
6. POST /mortgage/multiyear/agreement/create → договор
7. PUT  /agreement/set/signed/{isn} → подписание
8. POST /payment/link/agreement → оплата
9. GET  /print/agreement/{isn} → печатная форма
```

---

## 3. СОГАЗ (SOGAZ)

### 3.1 Алгоритм

```
001 → Ввод данных → «Показать цены»
002 → POST /MarketMortagageEstimation → предварительный расчёт
003 → Ответ: премия, страховая сумма, calculationId
005 → Выбор СК, ввод доп. данных → «Оформить полис»
006 → POST /MarketMortgageCreate → окончательный расчёт
007 → Ответ: номер договора
012 → Отображение, кнопка «Оплатить»
014 → Оплата через эквайринг
017 → POST /ContractReceivePayment → акцептация
022 → Оригиналы ПФ
```

### 3.2 Типы рисков (`riskCode`)

| Значение | Описание | Что страхуется |
|----------|----------|----------------|
| `combo` | Жизнь + Имущество | НСиБ + конструктивные элементы |
| `life` | Только жизнь | НСиБ |
| `property` | Только имущество | Конструктивные элементы |

### 3.3 Объекты (`objectType`)

| Значение | Описание | Год постройки | Доп. поля |
|----------|----------|---------------|-----------|
| `flat` | Квартира | ≥ 1945 | — |
| `room` | Комната | ≥ 1945 | — |
| `apartments` | Апартаменты | ≥ 1945 | — |
| `house` | Жилой дом | ≥ 1980 | marketPrice, cadastralNumber обязательны |
| `houseWithPlot` | Дом + ЗУ | ≥ 1980 (дом) | + plotAddress, plotCadastralNumber, plotMarketPrice |
| `plot` | Земельный участок | нет | Отдельный объект при houseWithPlot |

### 3.4 Банки

| Код | Банк |
|-----|------|
| `sber` | Сбербанк |
| `vtb` | ВТБ |
| `rshb` | Россельхозбанк |

### 3.5 Предварительный расчёт — `POST /MarketMortagageEstimation`

| Поле | Тип | Обязательно | Описание |
|------|-----|-------------|----------|
| riskCode | string | + | combo / life / property |
| objectType | string | + | flat / house / houseWithPlot / room / apartments |
| bank | string | + | sber / vtb / rshb |
| loanBalance | number | + | Остаток долга |
| beginDate | date | + | Дата начала полиса |
| endDate | date | + | Дата окончания (редактируемая, может быть < 1 года) |
| dateOfBirth | date | + | Дата рождения |
| gender | string | + | M / F |
| rate | number | — | Ставка (%) |
| cancellationRate | number | — | Ставка при отказе (%) |
| buildingYear | number | условно | Год постройки |
| address | string | + | «Регион, город, дом» |
| marketPrice | number | условно | Для house/plot |
| cadastralNumber | string | условно | Для house/plot |
| woodenWalls | boolean | — | Деревянные стены |
| woodenFloors | boolean | — | Деревянные перекрытия |
| height | number | при life/combo | Рост (см) |
| weight | number | при life/combo | Вес (кг) |
| share | number | — | Доля (%) |

### 3.6 Окончательный расчёт — `POST /MarketMortgageCreate`

Все поля из предварительного + :

| Поле | Тип | Обязательно | Описание |
|------|-----|-------------|----------|
| calculationId | string | + | ID из предварительного расчёта |
| lastName, firstName, middleName | string | + | ФИО |
| email | string | + | Для отправки ПФ |
| phone | string | + | Телефон |
| passportSeries | string | + | 4 цифры |
| passportNumber | string | + | 6 цифр |
| passportIssueDate | date | + | Дата выдачи |
| passportIssuedBy | string | + | Кем выдан |
| departmentCode | string | + | Формат XXX-XXX |
| issueAddress | string | + | «Регион + город» |
| numberCreditDoc | string | + | Номер КД |
| dateCreditDoc | date | + | Дата подписания КД |
| creditEndDate | date | — | Дата окончания КД |
| addressReg | string | — | Адрес регистрации |
| promotion | string | — | Промокод |
| coborrowers | array | — | Массив созаёмщиков |
| plotAddress, plotCadastralNumber, plotMarketPrice | — | при houseWithPlot | Данные ЗУ |

### 3.7 Созаёмщики — СОГАЗ

- Массив `coborrowers` в `MarketMortgageCreate`
- Поля на каждого: lastName, firstName, middleName, gender, dateOfBirth, share, passportSeries, passportNumber, passportIssueDate, passportIssuedBy, departmentCode, addressReg, phone, email
- Доля основного + созаёмщики = 100%
- При combo/life — отдельный расчёт риска жизни по каждому

### 3.8 Земельный участок

- Нужен **только** при `objectType = houseWithPlot`
- При flat, room, apartments, house (без ЗУ) — **не нужен**
- Обязательные поля: plotAddress, plotCadastralNumber, plotMarketPrice

### 3.9 Согласия (декларации)

| riskCode | Текст |
|----------|-------|
| combo | «...С **образцами** ключевых информационных документов...» (2 КИД) |
| life | «...С **образцом** ключевого информационного документа...» (1 КИД) |
| property | «...С **образцом** ключевого информационного документа...» (1 КИД) |

### 3.10 Статусы полиса (`stateCode`)

| Код | Описание |
|-----|----------|
| SecurityVerificationWaiting | Ожидание проверки СБ (5-15 сек) |
| PaymentWaiting | Ожидает оплаты |
| Paid | Оплачен |
| Active | Активен |
| WithDrawn | Отозвано |
| Cancelled | Отменён |

---

## 4. Сравнение полей по экранам формы

### Экран 1 (Минимальный расчёт)

| Поле формы | Альфа | Абсолют | СОГАЗ |
|-----------|-------|---------|-------|
| Вид имущества (buildingType) | buildingType: FLAT/ROOM/APARTMENTS | check_object: ISN | objectType: flat/house/... |
| Банк | bankName (из справочника) | bank ISN (из справочника) | bank: sber/vtb/rshb |
| Остаток долга | creditValue | credit.sum | loanBalance |
| Дата начала полиса | beginDate | date_begin | beginDate |
| Дата рождения | dateOfBirth | borrower.birth_date | dateOfBirth |
| Пол | gender: M/F | borrower.gender: M/F(?) | gender: M/F |
| Тип страхования | наличие lifeRisk/propertyRisk/titleRisk | риски из программы | riskCode: combo/life/property |
| Ставка | rate | — | rate |

### Экран 3 (Полная форма)

| Поле формы | Альфа | Абсолют | СОГАЗ |
|-----------|-------|---------|-------|
| ФИО | firstName, lastName, middleName | ФИО заёмщика | firstName, lastName, middleName |
| Паспорт | seria, number, dateOfIssue, issuedBy, issuedByUnitCode | паспортные данные | passportSeries, passportNumber, passportIssueDate, passportIssuedBy, departmentCode |
| Email | email | — | email |
| Телефон | phone | — | phone |
| Адрес регистрации | insurer.address | — | addressReg |
| Адрес объекта | insuranceObject.address | адрес объекта | address |
| Номер КД | numberCreditDoc | — | numberCreditDoc |
| Дата КД | dateCreditDoc | agreement.date | dateCreditDoc |
| Площадь | propertyArea | — | — |
| Год постройки | year | — | buildingYear |
| Кадастровый номер | kadastr | — | cadastralNumber |
| Рыночная стоимость | insuranceBaseAmount | — | marketPrice |
| Горючие стены | goruch | — | — |
| Деревянные стены | — | walls_type (ISN, справочник materials Code=W) | woodenWalls (boolean) |
| Деревянные перекрытия | — | floors_type (ISN, справочник materials Code=F) | woodenFloors (boolean) |
| Капремонт | capitalRepairExists | — | — |
| Ремонт в процессе | repairWorkInProgress | — | — |
| Бассейн | poolExists | — | — |
| Рост | — | — | height (при life/combo) |
| Вес | — | — | weight (при life/combo) |
| Профессия | professionId | profession_isn | — |
| Спорт | sportId | — | — |
| Хронические заболевания | illness | chronic_illness | — |
| Офисная работа | — | office_work | — |
| Давление | — | pressureUp, pressureDown | — |
| Тип рынка | saleType: FIRST/SECOND | object_type: 1/2 | — |
| Промокод | promoCode | — | promotion |
| Дата окончания КД | — | — | creditEndDate |
| Ставка при отказе | — | — | cancellationRate |
| Созаёмщики | coInsurers (макс 1) | co_borrowers | coborrowers |
| Земельный участок | — | check_object=654411 | plotAddress, plotCadastralNumber, plotMarketPrice (при houseWithPlot) |

---

## 5. Ключевые различия в логике

### Созаёмщики

| СК | Поддержка | Макс. кол-во | На расчёте | На оформлении |
|----|-----------|-------------|-----------|---------------|
| **Альфа** | Да | 1 | gender, dateOfBirth, share, lifeRisk | + ФИО, паспорт, адрес |
| **Абсолют** | Да | Уточнять | Те же данные что заёмщик | Полные данные |
| **СОГАЗ** | Да | Несколько | — | lastName, firstName, ..., share, паспорт |

### Земельный участок

| СК | Когда нужен | Как передаётся |
|----|------------|----------------|
| **Альфа** | Не поддерживается (только FLAT/ROOM/APARTMENTS) | — |
| **Абсолют** | check_object=654411 (отдельный объект) | Отдельный ISN |
| **СОГАЗ** | objectType=houseWithPlot | plotAddress + plotCadastralNumber + plotMarketPrice |

### Чек-боксы имущества (data-sks фильтрация)

| Поле | Альфа | Абсолют | СОГАЗ |
|------|-------|---------|-------|
| Горючие стены/перекрытия (goruch) | ✅ | ❌ | ❌ |
| Капремонт (capitalRepairExists) | ✅ | ❌ | ❌ |
| Ремонт в процессе (repairWorkInProgress) | ✅ | ❌ | ❌ |
| Бассейн (poolExists) | ✅ | ❌ | ❌ |
| Деревянные стены (woodenWalls) | ❌ | ❌ (используется walls_type ISN) | ✅ |
| Деревянные перекрытия (woodenFloors) | ❌ | ❌ | ✅ |

### Тип рынка (saleType)

| СК | Поле | Значения | Особенности |
|----|------|----------|-------------|
| **Альфа** | saleType | FIRST / SECOND | **Всегда передавать SECOND** — поле заблокировано в UI |
| **Абсолют** | object_type | 1 (вторичное) / 2 (новостройка) | При новостройке показывается поле «Застройщик» |
| **СОГАЗ** | — | Не передаётся | Не используется |

### Адрес выдачи полиса (issueAddress)

| СК | Поле | Обязательно | Формат |
|----|------|-------------|--------|
| **Альфа** | address.state + address.city | + | Регион и город отдельно |
| **Абсолют** | credit.address | + | Текст или fias_id |
| **СОГАЗ** | issueAddress | + (при MarketMortgageCreate) | «Регион, город» — одна строка |

### Год постройки, Кадастровый номер, Рыночная стоимость

| Поле | Альфа | Абсолют | СОГАЗ |
|------|-------|---------|-------|
| Год постройки | year (propertyRisk) | — | buildingYear (flat≥1945, house≥1980) |
| Кадастровый номер | kadastr | — | cadastralNumber (house/plot) |
| Рыночная стоимость | insuranceBaseAmount | — | marketPrice (house/plot) |

> В форме эти три поля отображаются только для Альфы и СОГАЗа (`data-sks="alfa sogaz"`).

### Созаёмщики — дополнительные поля по СК

| Поле | Альфа | Абсолют | СОГАЗ |
|------|-------|---------|-------|
| Профессия | professionId (lifeRisk) | profession_isn | — |
| Спорт | sportId (lifeRisk) | — | — |
| Рост, Вес | — | + (скоринг) | — |
| Давление | — | pressureUp, pressureDown | — |
| Хронические заболевания | illness (boolean) | chronic_illness | — |
| Адрес фактического проживания | — | + (code 2247) | — |
