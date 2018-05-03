import React, { Component } from 'react';

// Import widgets being used in this component
import NumberWidgetContainer from '../components/NumberWidgetContainer';
import ListWidgetContainer from '../components/ListWidgetContainer';
import GraphWidgetContainer from '../components/GraphWidgetContainer';

// Add in styles
import '../styles/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                {/* Add Widgets to display */}
                <GraphWidgetContainer href="http://localhost:3001/tickets/progression" heading="Work Orders Over Time" colspan={2} rowspan={2} />
                
                <NumberWidgetContainer href="http://localhost:3001/tickets/open" heading="Open Work Orders" />
                <ListWidgetContainer href="http://localhost:3001/stats/top" heading="Completed Work Orders by Technician" rowspan={3} />
                <NumberWidgetContainer href="http://localhost:3001/tickets/today" heading="Work Orders Opened Today" />
                <NumberWidgetContainer href="http://localhost:3001/tickets/urgent" heading="'Urgent' Work Orders" />
                
                <NumberWidgetContainer href="http://localhost:3001/stats/solved" heading="Completed Work Order %" />
            </div>
        );
    }
}

export default App;