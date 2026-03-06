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
| **Авторизация** | OAuth 2.0 (password grant) | OAuth 2.0 (client_credentials) | OAuth 2.0 (client_credentials) → Bearer |
| **Тестовый URL** | b2b-test2.alfastrah.ru/msrv_dev | represtapi.absolutins.ru/ords/rest/api/ | api-test.sogaz.ru/mortgage/v2/ |
| **Промокод** | promoCode (скидка к тарифу) | Нет данных | promotion |
| **Земельный участок** | Нет | check_object=654411 (ЗУ отдельный объект) | objectType=houseWithPlot → отдельный plot |

---

## 1. АльфаСтрахование (Alfa)

> **Источник:** Ипотека. Другие банки. Спецификация API для партнёров v22 (PDF). Тестовый стенд: `b2b-test2.alfastrah.ru/msrv_dev`, бой: `b2b.alfastrah.ru/msrvg`. Ответ расчёта/сохранения: `upid`, `calcId`, `canBeIssued`, `underwriterMessage`, премии по рискам.

### 1.0 Базовые URL и авторизация (по спеке v22)

| Переменная | Тест | Бой |
|------------|------|-----|
| **oauth/token** | `https://b2b-test2.alfastrah.ru/msrv_dev/oauth/token` | `https://b2b.alfastrah.ru/msrvg/oauth/token` |
| **base (REST)** | `https://b2b-test2.alfastrah.ru/msrv_dev/` | `https://b2b.alfastrah.ru/msrvg/` |

**Авторизация (п.1):** OAuth 2.0, password grant

- Метод: `POST`
- Content-Type: `multipart/form-data`
- Тело: `username`, `password`, `grant_type=password`
- Ответ: `access_token`, `token_type: "bearer"`, `refresh_token`, `expires_in` (срок жизни токена в секундах, на момент спеки ~15 минут)
- Обращение к защищённым сервисам: заголовок `Authorization: Bearer <access_token>`
- Обновление токена: тот же URL, параметры `grant_type=refresh_token`, `refresh_token`

**Эндпоинты (п.2–18):**

| # | Назначение | Метод | URL (тест) |
|---|------------|-------|------------|
| 2 | Доступные банки | GET | `.../mortgage/dictionary/bank/allowed` |
| 3 | Справочник спорта | GET | `.../mortgage/dictionary/sport/bank/{bankId}` |
| 4 | Справочник профессий | GET | `.../mortgage/dictionary/profession/bank/{bankId}` |
| 5 | Ограничения прав (титул) | GET | `.../mortgage/dictionary/restriction/property/right` |
| 6 | Документы подтверждения (титул) | GET | `.../mortgage/dictionary/document/confirmation` |
| 7 | Ограничения банка | GET | `.../mortgage/dictionary/restriction/bank/{bankId}` |
| 8 | Поля анкеты (questionary) | GET | `.../mortgage/dictionary/questionary/bank/{bankId}` |
| 9 | Расчёт | POST | `.../mortgage/partner/alfa/calc` |
| 10 | Сохранение договора | POST | `.../mortgage/partner/alfa/contract` |
| 11 | Статус сохранения | GET | `.../mortgage/partner/alfa/contract/{upid}/status` |
| 14 | Способы оплаты | GET | `.../payment-methods/methods?merchantOrderNumber=&merchantOrderType=` |
| 14 | Создание заказа оплаты | POST | `.../payment-methods/payment/{payment_system}` |
| 14 | Оплата ПОДЕЛИ | POST | `.../podeli-payment/order` |
| 15 | Печатная форма заявления | GET | `.../mortgage/partner/alfa/contract/{contractId}/printFormApp?upid={upid}` |
| 16 | Печатная форма полиса | GET | `.../mortgage/partner/alfa/contract/{contractId}/printForm?upid={upid}` |
| 17 | Оплата на стороне партнёра | POST | `.../mortgage/partner/alfa/payment/external` |
| 18 | Статус оплаты | GET | `.../payment-status/{mdorder}` |

**Ответ расчёта (п.9):** `lifePremium`, `propertyPremium`, `titlePremium`, `canBeIssued`, `underwriterMessage` (массив `{ riskType, message }`), `calcId`, `kv`, **`upid`** (идентификатор партнёрского расчёта). Для Сбербанка при двух рисках (жизнь+имущество) печатные формы вызываются для каждого `contractId` отдельно (п.15, 16).

**Ответ сохранения (п.10):** те же поля + `upid`. В запрос сохранения передаётся тело как в расчёте + обязательные для сохранения поля (ФИО, паспорт, контакты, адрес, `numberCreditDoc`, `propertyArea` и т.д.).

**Ответ статуса (п.11):** GET `.../contract/{upid}/status` → для банка ≠ Сбер: `contractId`, `contractNumber`, `statusName`, `statusDate`, `statusReason`, премии, `upid`. Для Сбербанка: `lifeContract` и `propertyContract` (каждый с `contractId`, `contractNumber`, `statusName`, `statusDate`), премии, `upid`. Оплата (п.14): `merchantOrderNumber` = `contractId` из ответа п.11 (или id единого чека); для печатной формы используются `contractId` и `upid` из п.11.

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

#### Ответ расчёта (п.9 спеки v22)

| Поле | Описание |
|------|----------|
| lifePremium, propertyPremium, titlePremium | Премии по рискам |
| lifePremiumWithoutPromo, propertyPremiumWithoutPromo, titlePremiumWithoutPromo | Премии без промокода |
| lifeInsuranceAmount, propertyInsuranceAmount, titleInsuranceAmount | Страховые суммы по рискам |
| canBeIssued | Можно ли перейти к оформлению |
| underwriterMessage | Массив `{ riskType, message }` — риск и причина отказа по скорингу |
| calcId | Идентификатор расчёта (число) |
| upid | Идентификатор партнёрского расчёта (строка, передаётся в contract и status) |
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

### 1.12 Полный жизненный цикл (п.0 спеки v22)

Порядок вызова сервисов при оформлении полиса:

```
1. POST /oauth/token → access_token (username, password, grant_type=password; multipart/form-data)
2. GET  /mortgage/dictionary/bank/allowed → список банков (id, code, bankName, islifeRiskAvailable, isPropertyRiskAvailable, isTitleRiskAvailable)
3. GET  /mortgage/dictionary/sport/bank/{bankId}        — если islifeRiskAvailable=true
4. GET  /mortgage/dictionary/profession/bank/{bankId}   — если islifeRiskAvailable=true
5. GET  /mortgage/dictionary/restriction/property/right  — если isTitleRiskAvailable=true
6. GET  /mortgage/dictionary/document/confirmation      — если isTitleRiskAvailable=true
7. GET  /mortgage/dictionary/restriction/bank/{bankId}  — ограничения банка (возраст, сроки, доли)
8. GET  /mortgage/dictionary/questionary/bank/{bankId}  → calc/save — список полей для расчёта и сохранения
9. POST /mortgage/partner/alfa/calc   → upid, calcId, canBeIssued, underwriterMessage, премии
10. POST /mortgage/partner/alfa/contract → upid, премии (тело: как calc + numberCreditDoc, ФИО, паспорт, контакты, propertyArea)
11. GET  /mortgage/partner/alfa/contract/{upid}/status  → contractId, contractNumber, statusName (для Сбера — lifeContract, propertyContract)
12. GET  /payment-methods/methods?merchantOrderNumber={contractId}&merchantOrderType=CONTRACT
13. POST /payment-methods/payment/{payment_system} или POST /podeli-payment/order → ссылка на оплату
14. GET  /mortgage/partner/alfa/contract/{contractId}/printFormApp?upid={upid} — заявление
15. GET  /mortgage/partner/alfa/contract/{contractId}/printForm?upid={upid}   — полис (для Сбера — по каждому contractId)
```

Оплата на стороне партнёра: POST `/mortgage/partner/alfa/payment/external` (mdOrder, premium, upid). Статус оплаты: GET `/payment-status/{mdorder}`.

---

## 2. Абсолют Страхование (Absolut)

> **Источник:** Абсолют — Ипотечное страхование многолетнее. Новые объекты имущества (docx). В спеке один стенд: `represtapi.absolutins.ru` (тестовый/песочница). Ответы API: обёртка `{ "call_id": "...", "result": { "data": { ... } }, "status": { "code": "success", "message": null } }`.

### 2.0 Базовые URL и авторизация (тестовый стенд)

| Переменная | URL |
|------------|-----|
| **oauth/token** | `https://represtapi.absolutins.ru/ords/rest/oauth/token` |
| **base_url (API)** | `https://represtapi.absolutins.ru/ords/rest/api/` |

**Авторизация:** OAuth 2.0 (client_credentials)

- Метод: `POST`
- Заголовки: `Content-Type: application/x-www-form-urlencoded`, `Authorization: Basic <base64(ClientID:ClientSecret)>`
- Тело: `grant_type=client_credentials` (и при необходимости `scope`)
- Ответ: `{ "access_token": "...", "token_type": "bearer", "expires_in": 3600 }` (токен 1 час)
- Далее все запросы к API: заголовок `Authorization: Bearer <access_token>`

**Эндпоинты (полные URL):**

| # | Назначение | Метод | URL |
|---|------------|-------|-----|
| 1 | Токен | POST | `https://represtapi.absolutins.ru/ords/rest/oauth/token` |
| 2 | Страны | GET | `.../api/dicti/mortgage/countries` |
| 3 | Профессии | GET | `.../api/dicti/mortgage/profession` |
| 4 | Группы рисков | GET | `.../api/dicti/mortgage/risk_group` |
| 5 | Программы | GET | `.../api/dicti/mortgage/program` |
| 6 | Банки (устар.) | GET | `.../api/dicti/mortgage/credit_bank` |
| 7 | Банки + программы | GET | `.../api/dicti/mortgage/credit_bank/details` |
| 8 | Предыдущие СК | GET | `.../api/dicti/mortgage/prev_sk` |
| 9 | Застройщики | GET | `.../api/dicti/mortgage/developers` |
| 10 | Сигнализации | GET | `.../api/dicti/mortgage/alarms` |
| 11 | Источники огня | GET | `.../api/dicti/mortgage/fire_sources` |
| 12 | Целевое назначение | GET | `.../api/dicti/mortgage/purpose` |
| 13 | Факторы риска | GET | `.../api/dicti/mortgage/risk_factors` |
| 14 | Материалы (стены/перекрытия) | GET | `.../api/dicti/materials` |
| 15 | Предварительный расчёт | POST | `.../api/mortgage/multiyear/calculation/express/create` |
| 16 | Полный расчёт | POST | `.../api/mortgage/multiyear/calculation/create` |
| 17 | Подтверждение расчёта | PUT | `.../api/mortgage/multiyear/approval/send` |
| 18 | Создание договора | POST | `.../api/mortgage/multiyear/agreement/create` |
| 19 | Подписание договора | PUT | `.../api/agreement/set/signed/{isn}` |
| 20 | Ссылка на оплату | POST | `.../api/payment/link/agreement` |
| 21 | Печатная форма договора | GET | `.../api/print/agreement/{isn}` |

**Формат ответа API:** `{ "call_id": "<uuid>", "result": { "data": { ... } }, "status": { "code": "success" | "error", "message": null | "<текст>" } }`. При ошибке — `status.code: "error"`, в теле могут быть детали.

### 2.1 Авторизация (дублирование для совместимости)

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

### 2.6 Предварительный расчёт — `POST /mortgage/multiyear/calculation/express/create`

**Запрос (минимальные данные по спеке):** программа (ISN из справочника program), банк (из credit_bank/details), тип объекта (check_object — ISN), тип рынка (object_type: 1 или 2), дата начала полиса, дата КД, сумма кредита, дата рождения заёмщика, пол.

**Ответ:** в обёртке API: `result.data` с полями расчёта (в т.ч. премия, идентификатор расчёта для следующего шага). `status.code: "success"`.

### 2.7 Полный расчёт — `POST /mortgage/multiyear/calculation/create`

**Запрос:** полные данные по анкете (в т.ч. после экспресс-расчёта).

С андеррайтингом, скорингом, проверкой ММИЛ.

**Ответ:** `result.data.ready_to_agreement` (true/false). `status.code: "success"`.

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

### 2.11 Полный жизненный цикл (по спеке docx)

Порядок вызовов (все после получения токена, заголовок `Authorization: Bearer <token>`):

```
1. POST /ords/rest/oauth/token → access_token (Authorization: Basic base64(ClientID:ClientSecret), body: grant_type=client_credentials)
2. GET  /api/dicti/mortgage/... → справочники (program, credit_bank/details, profession, risk_group и др.)
3. POST /api/mortgage/multiyear/calculation/express/create → экспресс-расчёт (предварительный)
4. POST /api/mortgage/multiyear/calculation/create → полный расчёт
5. PUT  /api/mortgage/multiyear/approval/send → подтверждение расчёта
6. POST /api/mortgage/multiyear/agreement/create → создание договора (ответ: isn)
7. PUT  /api/agreement/set/signed/{isn} → подписание договора
8. POST /api/payment/link/agreement → ссылка на оплату
9. GET  /api/print/agreement/{isn} → печатная форма договора
```

Ответы всех API (кроме oauth): `{ "call_id": "<uuid>", "result": { "data": { ... } }, "status": { "code": "success" | "error", "message": null | "<текст>" } }`.

---

## 3. СОГАЗ (SOGAZ)

> **Источник:** API СОГАЗ — Ипотека для агрегаторов, PHP v2 TEST (docx). В API v2 используется `estimationId` (в ответе предварительного расчёта), в выжимке ранее — `calculationId`; при интеграции ориентироваться на актуальную спеку.

### 3.0 Базовые URL и авторизация (тестовый стенд)

| Переменная | URL (TEST) |
|------------|------------|
| **auth** | `https://api-test.sogaz.ru/mortgage/v2/auth` |
| **base_url** | `https://api-test.sogaz.ru/mortgage/v2/api/` |

**Авторизация:** OAuth 2.0 (client_credentials)

- Метод: `POST`, Content-Type: `application/x-www-form-urlencoded`
- Параметры: `grant_type=client_credentials`, `client_id`, `client_secret`
- Токен используется в заголовке `Authorization: Bearer <token>` для всех запросов к API

**Эндпоинты (полные URL для теста):**

| # | Назначение | Метод | URL (TEST) |
|---|------------|-------|------------|
| 1 | Авторизация | POST | `https://api-test.sogaz.ru/mortgage/v2/auth` |
| 2 | Предварительный расчёт | POST | `https://api-test.sogaz.ru/mortgage/v2/api/MarketMortgageEstimation/1` |
| 3 | Окончательный расчёт / оформление | POST | `https://api-test.sogaz.ru/mortgage/v2/api/MarketMortgageCreate/1` |
| 4 | Информация о договоре | POST | `https://api-test.sogaz.ru/mortgage/v2/api/MarketMortgageInformation/1` |
| 5 | Акцептация оплаты | POST | `https://api-test.sogaz.ru/mortgage/v2/api/ContractReceivePayment/1` |
| 6 | Вложения (документы) | GET | `https://api-test.sogaz.ru/mortgage/v2/api/attachment/{attachmentId}` |

**Ответ предварительного расчёта (MarketMortgageEstimation):** `estimationId`, `deadline`, `policyPremium`, `sumInsured`, `insuredRisks` (Property, Life), `hasStopped`, `message`.

**Ответ оформления (MarketMortgageCreate):** `contractNumber`, `hasStopped`, `message`. При ошибке — `errors` (массив с `code`, `message`).

### 3.1 Алгоритм

```
001 → Ввод данных → «Показать цены»
002 → POST /MarketMortgageEstimation/1 → предварительный расчёт
003 → Ответ: policyPremium, sumInsured, estimationId, deadline, insuredRisks
005 → Выбор СК, ввод доп. данных → «Оформить полис»
006 → POST /MarketMortgageCreate/1 → окончательный расчёт (estimationId из шага 003)
007 → Ответ: contractNumber
008 → POST /MarketMortgageInformation/1 → информация о договоре (по contractNumber)
012 → Отображение, кнопка «Оплатить»
014 → Оплата через эквайринг
017 → POST /ContractReceivePayment/1 → акцептация оплаты
022 → GET /attachment/{attachmentId} → оригиналы ПФ
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

### 3.5 Предварительный расчёт — `POST /MarketMortgageEstimation/1`

Формат запроса (v2 TEST): обёртка `{ "data": { ... } }`.

| Поле | Тип | Обязательно | Описание |
|------|-----|-------------|----------|
| data.agent.guidAgent | string (GUID) | + | Идентификатор агента |
| data.agent.userId | string | + | ID пользователя |
| data.bank | string | + | `sber` / `vtb` / `rshb` |
| data.riskCode | string | + | `life` / `property` / `combo` |
| data.loanBalance | number | + | Остаток долга |
| data.gender | string | + | `Male` / `Female` |
| data.dateOfBirth | string | + | Дата рождения, `YYYY-MM-DD` |
| data.type | string | + | Тип объекта: `flat` / `house` / `houseWithPlot` (и др. по справочнику) |
| data.wallWoodMaterial | boolean | условно | Деревянные стены (по типу объекта) |

### 3.6 Окончательный расчёт — `POST /MarketMortgageCreate/1`

Формат запроса (v2 TEST): обёртка `{ "data": { ... } }`.

Ключевые блоки (укрупнённо, v2 TEST):

| Поле | Тип | Обязательно | Описание |
|------|-----|-------------|----------|
| data.agent | object | + | `{ guidAgent, userId }` |
| data.promotion | object | — | Скидка/акция: `{ name, value }` |
| data.estimationId | string (GUID) | + | ID из предварительного расчёта |
| data.bank | string | + | `sber` / `vtb` / `rshb` |
| data.startDate / data.endDate | string | + | Даты полиса, `YYYY-MM-DD` |
| data.insuredObjects[] | array | + | Объекты: `{ objectType, attributes{ buildingYear, address, cadastralNumber, marketPrice, wallWoodMaterial, floorWoodMaterial } }` |
| data.insuredPersons[] | array | + | Застрахованные: ФИО, ДР, пол, паспорт, адрес, телефон, email (+ рост/вес при life/combo) |
| data.riskCode | string | + | `life` / `property` / `combo` |
| data.creditData | object | + | КД: `{ number, startDate, endDate, loanBalance, loanRate, cancellationRate, issueAddress }` |

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

### 3.11 Информация о договоре — `POST /MarketMortgageInformation/1`

Запрос: `{ "data": { "contractNumber": "SGZKIS-..." } }`.

Ответ: `contractNumber`, `stateCode`, `policyPremium`, `sumInsured`, `insuredRisks` (Property, Life). Используется для отображения статуса и деталей договора перед оплатой.

### 3.12 Акцептация оплаты — `POST /ContractReceivePayment/1`

Вызывается после успешной оплаты через эквайринг. Ответ: обновление статуса на `Paid`.

### 3.13 Вложения (документы) — `GET /attachment/{attachmentId}`

Получение оригиналов печатных форм по `attachmentId` из ответа договора.

### 3.14 Блок `agent` (v2 API)

Во всех запросах к API передаётся блок `agent`:

| Поле | Тип | Описание |
|------|-----|----------|
| guidAgent | string (GUID) | Идентификатор агента |
| userId | string | ID пользователя |

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

---

## 5a. Флоу и экран 1: когда вызывается Alfa calc

### Кто прав

**Аналитик прав в том, что для вызова `POST /mortgage/partner/alfa/calc` по спецификации нужны поля со скриншота.**  
Вопрос не «кто прав», а **в какой момент продукт реально вызывает этот запрос**: при нажатии «Получить расчёт» (экран 1) или позже (после выбора СК и заполнения экрана 3).

### Обязательные поля для Alfa calc (из спеки и questionary)

**Всегда обязательные для calc (без учёта п.8):**

| Поле | В экране 1 | Примечание |
|------|------------|------------|
| beginDate | ✅ step1_beginDate | Дата начала полиса |
| agent.managerId, agent.agentContractId | ❌ | Берутся с бэкенда/конфига партнёра |
| mortgageAgreement.bankName | ✅ step1_bank | Банк из справочника |
| mortgageAgreement.creditValue | ✅ step1_creditValue | Остаток долга |
| mortgageAgreement.address.state | ❌ | Регион заключения КД |
| mortgageAgreement.address.city | ❌ | Город заключения КД |
| mortgageAgreement.dateCreditDoc | ❌ | Дата подписания КД (для Сбер на расчёте необяз.) |
| insuranceObject.buildingType | ✅ step1_buildingType | FLAT/ROOM/APARTMENTS (если не имущество — всё равно передавать FLAT) |
| insuranceObject.saleType | — | Всегда SECOND, можно не спрашивать |
| insuranceObject.address.state | ❌ | Регион объекта |
| insuranceObject.address.city | ❌ | Город объекта (в спеке address целиком) |
| insurer.gender | ✅ step1_gender | M/F |
| insurer.dateOfBirth | ✅ step1_dateOfBirth | Дата рождения |

**Доп. обязательные по банку (п.8 — `GET /mortgage/dictionary/questionary/bank/{bankId}`):**  
Для Сбербанка прод возвращает в questionary (массив calc):

| Поле | В экране 1 | Описание |
|------|------------|----------|
| life.illness | ❌ | Наличие хронических заболеваний |
| life.professionId | ❌ | Идентификатор профессии |
| life.sportId | ❌ | Идентификатор спорта |
| property.year | ❌ | Год постройки |

То есть для **реального** вызова Alfa calc при переходе с первого этапа на второй (как считает аналитик) на экране 1 **не хватает**:

- Регион и город заключения КД (mortgageAgreement.address)
- Дата подписания КД (dateCreditDoc) — для не-Сбер обязательна на расчёте
- Регион и город объекта (insuranceObject.address)
- Для Сбер: хронические заболевания, профессия, спорт, год постройки (если прод questionary так отдаёт)

**Лишнего на экране 1 для Alfa calc нет:** вид имущества, банк, остаток, дата начала, ДР, пол, тип рисков, ставка — всё используется в calc или в маппинге (тип рисков на бэке режет в life/property/title).

### Как может быть устроен флоу

1. **Вариант А: calc вызывается по кнопке «Получить расчёт»**  
   Тогда переход с первого этапа на второй = реальный вызов `alfa/calc` (и аналогов для Абсолют/СОГАЗ).  
   В этом случае экрана 1 **недостаточно**: нужно добавить регион/город КД, дату КД (для не-Сбер), регион/город объекта и по questionary для выбранного банка (для Сбер — illness, professionId, sportId, property.year) либо запрашивать questionary и показывать только нужные поля.

2. **Вариант Б: calc вызывается после выбора СК и заполнения полной формы**  
   Экран 1 используется только для фильтрации СК и, при желании, «превью» цен без реального calc; реальный вызов `alfa/calc` — после перехода на экран 3 и сбора всех обязательных полей (в т.ч. адреса КД, объекта, даты КД и полей из questionary).  
   Тогда экран 1 может оставаться минимальным (как сейчас), а недостающие для calc поля собираются на экране 3.

### Рекомендация

- **Согласовать с аналитиком и бэкендом:** вызов `POST /mortgage/partner/alfa/calc` происходит при «Получить расчёт» (тогда расширяем экран 1) или при «Расчёт»/оформлении после выбора СК (тогда оставляем экран 1 минимальным и проверяем, что на экране 3 есть все поля для calc).
- Если решат, что calc — при переходе с первого на второй этап: на экран 1 добавить минимум: **регион и город заключения КД**, **дата подписания КД**, **регион и город объекта**; для Сбер — **год постройки**, **хронические заболевания**, **профессия**, **спорт** (или подставлять дефолты/брать из questionary и не показывать лишнего).

### Опердир: «минималка → расчёт → дособор» — по спекам так или нет?

**По спекам так и задумано — но только у двух из трёх СК.**

| СК | Что в спеке | Совпадает с флоу опердира? |
|----|-------------|----------------------------|
| **Абсолют** | **П.2.6–2.7, 2.11 (спека docx):** авторизация Basic base64(ClientID:ClientSecret) → справочники (program, credit_bank/details) → **предварительный расчёт** `POST .../express/create` (минимальные данные: программа, банк, check_object, object_type, даты, сумма, ДР, пол) → **полный расчёт** `POST .../calculation/create` → PUT approval/send → POST agreement/create → PUT agreement/set/signed/{isn} → POST payment/link → GET print/agreement/{isn}. Ответы: `call_id`, `result.data`, `status`. Стенд: `represtapi.absolutins.ru/ords/rest/api/`. | ✅ **Да.** Минималка → расчёт (премия) → дособор данных → полный расчёт → оформление по циклу. |
| **СОГАЗ** | **П.3.1, 3.5–3.6:** 001 Ввод данных → «Показать цены» → **предварительный расчёт** `POST /MarketMortgageEstimation/1` → ответ: policyPremium, estimationId, deadline. Дальше 005 Выбор СК, ввод доп. данных → «Оформить полис» → **окончательный расчёт** `POST /MarketMortgageCreate/1` (в него передаётся estimationId + insuredPersons, insuredObjects, creditData). Тест: `https://api-test.sogaz.ru/mortgage/v2/`. | ✅ **Да.** Минималка → расчёт (цены) → дособор → окончательный расчёт/оформление. |
| **Альфа** | **П.0, 1.0, 1.12 (спека v22 PDF):** POST oauth/token (password) → GET bank/allowed → GET questionary/restriction по bankId → POST alfa/calc (все обязательные поля + по п.8) → POST alfa/contract → GET contract/{upid}/status (contractId, contractNumber) → payment-methods → printForm/printFormApp по contractId+upid. Один расчёт: calc; ответ: upid, calcId, canBeIssued, underwriterMessage. Стенд: `b2b-test2.alfastrah.ru/msrv_dev`. | ❌ **В спеке нет «минималка → дособор».** Calc принимает полный набор обязательных полей (и по questionary п.8) сразу; далее contract → status → оплата → ПФ. |

**Итог:** Опердир и вы говорите об одном и том же **продуктовом флоу** (минимальные данные на первом экране → получаем расчёт/цены → потом добиваем данные). По спекам этот флоу **явно описан у Абсолют и СОГАЗ**. У **Альфы** в спеке такого двухшагового сценария нет: там один запрос calc с полным набором обязательных полей. То есть для Альфы либо (1) на первом шаге не вызываем Alfa calc, а показываем превью/мокап до выбора СК и экрана 3, либо (2) бэкенд/партнёрский контур Альфы по факту умеет «минимальный calc» (в доке не отражено), либо (3) на экран 1 для Альфы добавляем недостающие поля (адреса КД и объекта, дата КД, по questionary для банка). Разговор с опердиром — про один процесс (минималка → расчёт → дособор); в спеках он зафиксирован для Абсолют и СОГАЗ, для Альфы — нет.

---

## 6. Сверка формы со спецификациями (аудит)

Проверка полей и логики формы по текущему состоянию (index.html) против СПЕЦИФИКАЦИИ_API.

### Что соответствует

| Область | Реализация |
|--------|------------|
| **Экран 1** | Вид имущества, банк, остаток, даты, пол, тип рисков, ставка — маппинг по СК корректен. |
| **Банки** | Альфа: 21 банк; Абсолют: общие; СОГАЗ: sber, vtb, rshb. data-banks-exclude / data-banks-exclude-alfa учтены. |
| **Типы объекта** | Альфа: FLAT/ROOM/APARTMENTS; Абсолют: 11 типов (ISN); СОГАЗ: flat/room/apartments/house/houseWithPlot. ROOM без Абсолют — верно. |
| **Тип рынка** | Альфа: принудительно SECOND, скрыт для СОГАЗ. Застройщик при FIRST для Абсолют. |
| **Объект** | Площадь — alfa, absolut; год постройки, кадастр, рыночная стоимость — alfa, sogaz. Чекбоксы имущества по data-sks. |
| **Абсолют** | Материал стен/перекрытий при 654401; блок доп. характеристик (alarms, fire_sources, purpose, risk_factors); застройщик при primary. |
| **СОГАЗ** | ЗУ при houseWithPlot (plotAddress, plotCadastral, plotMarketPrice). issueAddress отдельно. |
| **Титул Альфа** | Блок скрыт для sber, domrf (data-banks-exclude). |
| **Созаёмщики** | Альфа: макс 1, блокировка при Сбер + хинт. Поля по СК (профессия, спорт, рост/вес, давление) с data-sks. |
| **Группа риска** | Отключается при отмеченной «Офисная работа». |

### Рекомендации (реализовано)

1. **Альфа: Апартаменты + банк ≠ Сбер** — реализовано: при Альфа + Апартаменты + банк не Сбер на экране 1 и 3 тип риска принудительно «Только жизнь», селект заблокирован, показывается хинт.

2. **СОГАЗ: рост/вес заёмщика при riskCode** — реализовано: для СОГАЗ строка с рост/вес скрывается при `riskCode === 'property'`; при life/combo отображается.

3. **Блок «Страхование жизни» при riskCode = property** — реализовано: блок (id="lifeInsuranceBlock") скрывается для Альфа и Абсолют, когда выбран «Только имущество».

4. **Абсолют: доп. характеристики объекта** — реализовано: блок «Дополнительные характеристики объекта (Абсолют)» показывается только при виде имущества 654401 (Жилой дом) или 654411 (Земельный участок); `data-show-when` поддерживает несколько значений через пробел.

5. **Абсолют: материал стен/перекрытий** — без изменений: показываются только при 654401 (Жилой дом); при необходимости можно расширить на другие объекты.

6. **Маппинг типов объекта при отправке** — на бэкенде при СК Абсолют маппить FLAT → 654391 и т.д.; форма не менялась.

### Итог

- Условная логика по типу риска и типу объекта внедрена в соответствии с аудитом.
