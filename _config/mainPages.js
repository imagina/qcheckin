export default {
  shiftsIndex: {
    permission: 'icheckin.shifts.manage',
    activated: true,
    authenticated: true,
    path: '/checkin/shifts',
    name: 'qcheckin.main.shifts.index',
    crud: import('modules/qcheckin/_crud/shifts'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('modules/qsite/_layouts/master.vue'),
    title: 'icheckin.cms.sidebar.Shifts',
    icon: 'fa-light fa-user-clock',
    subHeader: {
      refresh: true
    }
  },
}
