Instance templates live here.

`scripts/create-instance.js` first looks for `instances/_templates/<template>`.
If the requested template is not present yet, it seeds from `instances/scodrinon`
so the scaffold workflow remains usable while purpose-built templates are added.

Recommended next templates:

- `hostel`: rooms, guest ratings, WhatsApp, local experiences, optional regional trails
- `boutique-hotel`: rooms/suites, direct booking, local experiences, no hostel ratings
- `apartment-rental`: units, house rules, direct inquiry, light local guide
