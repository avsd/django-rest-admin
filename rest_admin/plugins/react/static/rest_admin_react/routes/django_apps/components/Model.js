import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';


const Model = ({
    name,
    object_name,
    admin_url,
    add_url,
}) => (
  <tr className={'model-OBJECT_NAME'.replace('OBJECT_NAME', object_name.toLowerCase())}>
    {admin_url
      ? (<th scope="row"><Link to={admin_url}>{name}</Link></th>)
      : (<th scope="row">{name}</th>)
    }

    {add_url
      ? (<td><Link to={add_url} className="addlink">Add</Link></td>)
      : (<td>&nbsp;</td>)
    }

    {admin_url
      ? (<td><Link to={admin_url} className="changelink">Chage</Link></td>)
      : (<td>&nbsp;</td>)
    }
  </tr>

);

Model.propTypes = {
    name: React.PropTypes.string.isRequired,
    object_name: React.PropTypes.string.isRequired,
    admin_url: React.PropTypes.string,
    add_url: React.PropTypes.string
}

export default Model
