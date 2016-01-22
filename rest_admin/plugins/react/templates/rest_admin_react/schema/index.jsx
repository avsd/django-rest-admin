{% load compile_static %}
{% inlinecompile 'browserify' %}
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <div><h1>App goes here</h1></div>
        );
    }
};

const run = (element_id) => {
    console.log('Loading to ' + element_id);
    var element = document.getElementById(element_id);
    ReactDOM.render(<App />, element);
    console.log('Loaded to ' + element_id);
}

console.log('Running!');
document.addEventListener("DOMContentLoaded", function(event) { 
  run('content');
});
{% endinlinecompile %}
