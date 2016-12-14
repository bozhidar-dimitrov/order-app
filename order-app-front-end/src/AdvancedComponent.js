import React, { Component } from 'react';

export default class AdvancedComponent extends Component {
	constructor(props, defaultStylesheetName) {
		super(props);
		if (props.stylesheet) {
			require(props.stylesheet);
		} else {
			require(defaultStylesheetName);
		}
	}
}