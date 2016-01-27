import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import NoPermissionsMessage from '../../../components/NoPermissionsMessage.js'
import Loading from '../../../components/Loading.js'
import App from '../components/App.js'
import Model from '../components/Model.js'

import { fetchDjangoApps } from '../../../modules/django_apps/actions.js'


class Apps extends React.Component {

    componentWillMount() {
        if (this.props.django_apps.items === null && !this.props.django_apps.isFetching) {
            this.props.dispatch(fetchDjangoApps());
        }
    }

    render() {
        const {isFetching, items} = this.props.django_apps;

        if (isFetching)
            return <Loading />;

        if (!items)
            return <NoPermissionsMessage />;

        const buildModelsArray = app => app.models.map(model => (
          <Model key={model.object_name} name={model.name} object_name={model.object_name}
              admin_url={model.admin_url} add_url={model.add_url} />
        ));
        const apps = items.map(app => (
          <App key={app.name} name={app.name} label={app.app_label} url={app.url}>
            {buildModelsArray(app)}
          </App>
        ));

        return <div>{apps}</div>;
    }
};


export default connect(
  /* mapStateToProps: */
  state => state,

  /* mapDispatchToProps: */
  dispatch => ({dispatch})
)(Apps);
