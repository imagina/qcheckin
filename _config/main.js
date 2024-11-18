import {eventBus, i18n, store} from "../../../plugins/utils";

export default {
  moduleName: 'ichecking',
  //Entities
  entityNames: {
    shifts: 'shifts',
  },
  headerActions: async () => {
    return [
      //checking
      {
        name: 'checking',
        vIf: (config('app.mode') == 'ipanel') && store.hasAccess('icheckin.shifts.create'),
        order: 1,
        label: i18n.tr('icheckin.cms.sidebar.checkin'),
        props: {
          icon: 'fas fa-stopwatch',
          round: true
        },
        action: () => eventBus.emit('toggleMasterDrawer', 'checkin')
      }
    ]
  }
}
