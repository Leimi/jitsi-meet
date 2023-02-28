// @flow
import React, { Component } from 'react';

import Tab from './Tab';

import { Tab as AriakitTab, TabList, TabPanel, useTabState } from "ariakit/tab";

/**
 * The type of the React {@code Component} props of {@link Tabs}.
 */
type Props = {

    /**
     * Handler for selecting the tab.
     */
    onSelect: Function,

    /**
     * The index of the selected tab.
     */
    selected: number,

    /**
     * Tabs information.
     */
    tabs: Object
};

/**
 * A React component that implements tabs.
 *
 */
export default function Tabs({ onSelect, selected, tabs }: Props) {
    const tabState = useTabState();

    return (
        <div className = 'tab-container'>
            { tabs.length > 0 ? (
                <>
                    <TabList
                        aria-label = 'Tab list'
                        className = 'tab-buttons'
                        state = { tabState }>
                        {tabs.map((tab, index) => <AriakitTab key = { index }>{tab.label}</AriakitTab>)}
                    </TabList>
                    {tabs.map((tab, index) => (
                        <TabPanel
                            className = 'tab-content'
                            key = { index }
                            state = { tabState }>
                            {tab.content}
                        </TabPanel>
                    ))}
                </>) : null
            }
        </div>
    );
}
