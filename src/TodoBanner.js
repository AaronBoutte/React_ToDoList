import React, { Component } from 'react';

export class TodoBanner extends Component {
    render = () => 
    <h4 className="bg-primary text-white text-center p-2">
      {/* 
      The curly braces below will denote an expression.
      When the render method is called, the expression will be evaulted, and its 
      results is included in the content presented  to the user. This is very similar to how Razor works in
      .cshtml files.
      */}
      { this.props.name }'s
      To Do list Application 
      ({ this.props.tasks.filter(t => !t.done).length } items to do)
    </h4>
}