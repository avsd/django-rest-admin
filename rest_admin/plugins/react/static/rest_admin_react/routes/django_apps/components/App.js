import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';


const App = ({
    name,
    label,
    url,
    children,
}) => (
  <div className={'module app-LABEL'.replace('LABEL', label)}>
    <table>
      <caption>
          <Link to={url} className="section" title={
              'Models in the NAME application'.replace('NAME', name)
          }>{name}</Link>
      </caption>
      {children}
    </table>
  </div>

);

App.propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
    label: React.PropTypes.string.isRequired,
    url: React.PropTypes.string
}

export default App
