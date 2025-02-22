import { MiddlewareRegistry } from '../base/redux';
import { SETTINGS_UPDATED, getHideSelfView } from '../base/settings';
import { DISABLE_SELF_VIEW_NOTIFICATION_ID, NOTIFICATION_TIMEOUT_TYPE, showNotification } from '../notifications';

import { openSettingsDialog } from './actions';
import { SETTINGS_TABS } from './constants';

MiddlewareRegistry.register(({ dispatch, getState }) => next => action => {
    const oldValue = getHideSelfView(getState());

    const result = next(action);

    switch (action.type) {
    case SETTINGS_UPDATED: {
        const newValue = action.settings.disableSelfView;

        if (newValue !== oldValue && newValue) {
            dispatch(showNotification({
                uid: DISABLE_SELF_VIEW_NOTIFICATION_ID,
                titleKey: 'notify.selfViewTitle',
                customActionNameKey: [ 'settings.title' ],
                customActionHandler: [ () =>
                    dispatch(openSettingsDialog(SETTINGS_TABS.MORE))
                ]
            }, NOTIFICATION_TIMEOUT_TYPE.STICKY));
        }
    }
    }

    return result;
});
