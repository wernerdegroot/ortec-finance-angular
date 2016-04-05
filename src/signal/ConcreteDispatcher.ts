/// <reference path="../../typings/main.d.ts" />

import { Dispatcher } from 'signal/Dispatcher';
import { ConcreteSignal } from 'signal/ConcreteSignal';
import { ActionHandler } from 'signal/ActionHandler';
import { Notifier } from 'signal/Notifier';
import { ConcreteNotifier } from 'signal/ConcreteNotifier';
import { ForwardedDispatcher } from 'signal/ForwardedDispatcher';

export class ConcreteDispatcher<MODEL_TYPE, ACTION_TYPE> implements Dispatcher<ACTION_TYPE> {

    private modelSignal: ConcreteSignal<MODEL_TYPE>;
    private actionHandler: ActionHandler<MODEL_TYPE, ACTION_TYPE>;

    public constructor(
        modelSignal: ConcreteSignal<MODEL_TYPE>,
        actionHandler: ActionHandler<MODEL_TYPE, ACTION_TYPE>) {

        this.modelSignal = modelSignal;
        this.actionHandler = actionHandler;
    }

    public send(action: ACTION_TYPE): void {
        const oldModel: MODEL_TYPE = this.modelSignal.getLatestValue();
        const newModel: MODEL_TYPE = this.actionHandler.handle(oldModel, action, this);
        this.modelSignal.send(newModel);
    }

    public forward<NEW_ACTION_TYPE>(transformation: (_1: NEW_ACTION_TYPE) => ACTION_TYPE): Dispatcher<NEW_ACTION_TYPE> {
        return new ForwardedDispatcher<NEW_ACTION_TYPE, ACTION_TYPE>(this, transformation);
    }

    public forwardNotify(supplier: () => ACTION_TYPE): Notifier {
        return new ConcreteNotifier<ACTION_TYPE>(this, supplier);
    }

}
