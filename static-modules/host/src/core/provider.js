import { ee } from "../services/event-emitter";

export class Provider {
  constructor() {}

  name = "hostApplication";

  get name() {
    return this.name;
  }

  init() {
    Object.assign(window, {
      hostApplication: {
        ee,
      },
    });
  }
}

export const provider = new Provider();
