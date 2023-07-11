/**
 * Эмиттер событий
 */
class EventEmitter {
  /**
   * подписка на событие
   *
   * @param eventName название события, на которое осуществляется подписка
   * @param listener переданный обработчик
   * @param options возможные передаваемые опции: наименование группы, следует ли вызывать обработчик один раз,
   * тип обработчика
   * В случае, если обработчик должен сработать один раз, то после наступлении события и исполнения переданного обработчика,
   * он удаляется из коллекции подписок
   */
  on(eventName, listener, options) {
    const { group = `default`, ...attrs } = options;

    !this._listeners[group] && (this._listeners[group] = {});
    !this._listeners[group][eventName] &&
      (this._listeners[group][eventName] = []);

    this._listeners[group][eventName].push({
      listener,
      ...attrs,
    });

    return this;
  }

  /**
   * отписка от события
   *
   * @param eventName наименование события
   * @param listener переданный обработчик
   */
  off(eventName, listener) {
    if (!eventName && !listener) {
      this._listeners = {};
      return this;
    }

    if (eventName) {
      if (!listener) {
        for (const key in this._listeners) {
          if (this._listeners.hasOwnProperty(key)) {
            delete this._listeners[key][eventName];
          }
        }
      } else {
        Object.values(this._listeners).forEach((group) => {
          if (group[eventName]) {
            group[eventName] = group[eventName].filter(
              (item) => item.listener !== listener
            );
          }

          group[eventName] &&
            !group[eventName].length &&
            delete group[eventName];
        });
      }
    }

    return this;
  }

  /**
   * удаление все обработчиков из коллекции
   *
   * @param groupName наименование группы
   */
  offGroup(groupName) {
    groupName && delete this._listeners[groupName];

    return this;
  }

  /**
   * метод вызывается в случае, когда необходимо оповестить всех подписчиков
   *
   * @param eventName наименование событие
   * @param args переданные аргументы
   */
  emit(eventName, args, type = "") {
    if (!Object.keys(this._listeners).length) {
      return this;
    }

    for (const key in this._listeners) {
      if (this._listeners.hasOwnProperty(key)) {
        const group = this._listeners[key];
        group[eventName] &&
          group[eventName].map((target) => {
            if (type) {
              if (target.type !== type) {
                return this;
              }
            }
            target.listener(args);
            target.once && this.off(eventName, target.listener);
          });
      }
    }

    return this;
  }

  /**
   * коллекция подписчиков
   * подписчики разбиты по группам. Группы в свою очередь формируются с произвольными именами,
   * наименование которых передаются при подписке на то или иное событие
   */
  _listeners = {};
}

export const ee = new EventEmitter();
