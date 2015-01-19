// modification of original sources @ https://github.com/tastejs/todomvc/blob/gh-pages/examples/react/js/utils.js
(function () {
    'use strict';
     var React = require('react');
     var Utils = require('./utils.js');
     var RecordState = require('./record-state.js');

     var TodoFooter = React.createClass({
        render: function () {
            var activeTodoWord = Utils.pluralize(this.props.count, 'item');
            var clearButton = null;

            if (this.props.completedCount > 0) {
                clearButton = (
                    <button
                        id="clear-completed"
                        onClick={this.props.onClearCompleted}>
                        Clear completed ({this.props.completedCount})
                    </button>
                );
            }

            // React idiom for shortcutting to `classSet` since it'll be used often
            var cx = React.addons.classSet;
            var nowShowing = this.props.nowShowing;
            return (
                <footer id="footer">
                    <span id="todo-count">
                        <strong>{this.props.count}</strong> {activeTodoWord} left
                    </span>
                    <ul id="filters">
                        <li>
                            <a
                                href="#/"
                                className={cx({selected: nowShowing === RecordState.ALL_TODOS})}>
                                    All
                            </a>
                        </li>
                        {' '}
                        <li>
                            <a
                                href="#/active"
                                className={cx({selected: nowShowing === RecordState.ACTIVE_TODOS})}>
                                    Active
                            </a>
                        </li>
                        {' '}
                        <li>
                            <a
                                href="#/completed"
                                className={cx({selected: nowShowing === RecordState.COMPLETED_TODOS})}>
                                    Completed
                            </a>
                        </li>
                    </ul>
                    {clearButton}
                </footer>
            );
        }
    });

    module.exports = TodoFooter;
})();

