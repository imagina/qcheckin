<template></template>
<script>
import { eventBus } from 'src/plugins/utils'
export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qcheckin.entityNames.shifts"),
        apiRoute: 'apiRoutes.qcheckin.shifts',
        permission: 'icheckin.shifts',
        extraFormFields: 'icheckin.crud-fields.shifts',
        create: false,
        read: {
          columns: [
            //Id
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            //clocked In By
            {
              name: 'checkinBy', label: this.$tr('icheckin.cms.sidebar.clockedInBy'),
              field: row => row.checkinBy ? row.checkinBy.fullName : "-", align: 'left'
            },
            // Period Elapsed
            {
              name: 'periodElapsed', label: `${this.$tr ("isite.cms.label.time")} (h : m : s)`,
              format: val => val ? `${val.h}:${val.i}:${val.s}` : '-',
              field: 'diff', align: 'center'
            },
            //clocked In At
            {
              name: 'clockedInAt', label: this.$tr('icheckin.cms.sidebar.clockedInAt'),
              format: val => val ? this.$trd(val, {type: 'long'}) : '-',
              align: 'left', field: 'checkinAt'
            },
            //Clocked Out At
            {
              name: 'checkoutByFullName', align: 'left', label: this.$tr('icheckin.cms.sidebar.clockedOutAt'),
              field: row => row.checkoutBy ? row.checkoutBy.fullName : "-"
            },
            // clocked In At
            {
              name: 'checkoutAt', label: this.$tr('icheckin.cms.sidebar.clockedInOut'), field: 'checkoutAt',
              format: val => val ? this.$trd(val, {type: 'long'}) : '-', align: 'left'
            },
            //Clocked Out At
            {
              name: 'comment', label: `${this.$tr('icheckin.cms.sidebar.commet')}`, align: 'left',
              field: 'options', classes: 'ellipsis', style: 'max-width : 150px',
              format: val => val && val.comment ? val.comment : "-"
            },
            //Initial location checkin
            {
              name: 'geoLocationCheckin', field: 'geoLocation', label: this.$tr('icheckin.cms.sidebar.geoLocationCheckin'),
              format: row => row.checkin ? `Lat: ${row.checkin.latitude} | Lng: ${row.checkin.longitude}` : "-",
              align: 'left'
            },
            //Final location checkout
            {
              name: 'geoLocationCheckout', label: this.$tr('icheckin.cms.sidebar.geoLocationCheckout'),
              format: row => row.checkout ? `Lat: ${row.checkout.latitude} | Lng: ${row.checkout.longitude}` : "-",
              align: 'left', field: 'geoLocation'
            },
            //Action
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {},
          filters: {
            date: true,
            repId: {
              type: 'select',
              props: {
                label: this.$tr('isite.cms.label.user')
              },
              loadOptions: {
                apiRoute: 'apiRoutes.quser.users',
                select: {label: 'fullName', id: 'id'},
              },
            },
          },
          actions: [
            {
              color: 'warning',
              icon: 'fas fa-stop',
              tooltip: this.$tr('isite.cms.label.close'),
              format: field => {
                return {
                  vIf: field.checkoutAt ? false : true
                }
              },
              action: (item) => {
                //Request Params
                let requestParams = {params: {filter: {checkout: true}}}
                //Request
                this.$crud.update('apiRoutes.qcheckin.checkout', item.id, item, requestParams).then(response => {
                  eventBus.emit('qcheckin.checkout', item)
                  eventBus.emit('crud.data.refresh')
                }).catch(error => this.loading = false)
              }
            }
          ]
        },
        update: {
          title: this.$tr('icheckin.cms.sidebar.updateShift'),
          requestParams: {}
        },
        delete: true,
        //Form
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          checkinAt: {
            value: '',
            type: 'fullDate',
            props: {
              label: `${this.$tr('icheckin.cms.sidebar.clockedInAt')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          checkoutAt: {
            value: '',
            type: 'fullDate',
            props: {
              label: `${this.$tr('icheckin.cms.sidebar.clockedInOut')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          comment: {
            value: '',
            type: 'input',
            isFakeField: true,
            props: {
              label: `${this.$tr('isite.cms.form.comment')}`,
              type: 'textarea',
              rows: "4",
              debounce: 1500
            },
          },
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>

