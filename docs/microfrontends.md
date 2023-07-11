## Структура документа

### Оглавление

- [Microfrontend](#Microfrontend)
- [Задачи архитектурного подхода](#Задачи-архитектурного-подхода)
- [Базовая концепция микрофронтового приложения](#Базовая-концепция-микрофронтового-приложения)
- [Проблемы при построении микрофронтовых приложений](#Проблемы-при-построении-микрофронтовых-приложений)
- [Микрофронт и lazy loading](#Микрофронт-и-lazy-loading)

### Microfrontend

Микрофронтенд — архитектурный подход, в котором независимые приложения собраны в одно приложение. Он дает возможность объединить в одном приложении разные виджеты, страницы или плагины, написанные разными командами с использованием разных технологий (фреймворков). В настоящий момент используются различные инструменты для построения микрофронтовых приложений: `Module Federation` (built-in плагин `webpack`), `Single-SPA` (фреймворк, позволяющий строить микрофронтовые приложения), `npm`-пакеты (если есть переиспользуемые компоненты между проектами, но работоспособность обеспечивается на уровне build-тайма), `iframe` (одиночная вставка для сочетания несочетаемого) и т.д.

Микрофронтенды имеют смысл, если:

- приложение достаточно крупное
- имеется несколько независимых команд разработки
- проблемами при выкате обновлений приложения
- преимущества монолита обернулись в минусы

### Задачи архитектурного подхода

Основные задачи, решаемые микрофронтовой архитектурой:

- разделение крупных команд разработки на несколько независимых
- модульность. Отдельные части приложения — это полностью независимые полноценные приложения. Инкапсуляция в данном случае ведет к тому, что каждое из частей приложения слабо влияет на другие его части
- скорость тестирования: изменения в одном приложении можно протестировать изолированно и только в этом приложении, не тратя времени на тестирование всего остального функционала
- параллельные (независимые) жизненные циклы приложения: отдельные приложения могут и должны деплоиться независимо
- ускорение доставки в продакшн: доставка кода может осуществляться автоматически. Например, когда шарится общая кнопка и мы поменяли её цвет, поставляем только shared-модуль, и он автоматически раздаёт новую реализацию этой кнопки
- упрощенный release-management

### Базовая концепция микрофронтового приложения

Базовая архитектура микрофронтового приложения состоит из следующих частей:

- `host (shell) application` - это основное (корневое приложение), в которое встраиваются остальные приложения. Может иметь шину для обеспечения возможности общения между хостовым приложением и удаленным (`remote`).
- `remote application` - приложение (или его часть), которое может быть встроено в основное (`host`) приложение

### Проблемы при построении микрофронтовых приложений

Микрофронтенды — это не универсальное решение всех проблем. Это один из архитектурных подходов, который может иметь преимущества при определенных обстоятельствах.
Как и у любых других подходов, здесь есть свои проблемы и подводные камни:

- управление состоянием: при использовании микрофронтендов возникает необходимость в управлении состоянием между различными компонентами приложения. Это может привести к сложностям в отслеживании состояния и синхронизации данных между различными компонентами. На этом уровне необходимо продумать уровень коммуникации между приложениями
- грамотная декомпозиция приложения
- сложность интеграции: при использовании микрофронтендов необходимо реализовать механизмы для интеграции различных частей приложения в единую систему. Это может привести к сложностям при интеграции существующих и новых компонентов
- работа с зависимостями и их версиями
- обработка исключительных ситуаций

Несмотря на все потенциальные проблемы, достоинства, имеющиеся у микрофронтовой архитектуры, перевешивают все недостатки.
Каждый архитектурный подход хорош по-своему и всему должно быть свое место.
Использование такого архитектурного подхода на маленьких проектах и в маленьких командах несет больше проблем и дополнительной сложности в разработке, чем преимуществ. Но большие проекты вместе с распределенными командами, наоборот, получают больший выигрыш от создания микрофронтенд-приложений.

### Микрофронт и lazy loading

Ленивая загрузка (`lazy loading`) и микрофронтенды решают разные задачи, несмотря на то, что в обоих случаях происходит "дробление" приложения.
`Lazy loading` решает проблему производительности: подгрузка частей бандла при необходимости, быстрый (критичный) запуск приложения и т.д.

Подход с микрофронтами проблему производительности не решают, а иногда даже усугубляют. Зато они помогают организовать разработку в более комфортном для конкретной подкоманды виде, минимизируя проблемы, которые появляются с ростом приложения/команд.