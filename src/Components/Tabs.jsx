import React, { useContext, useEffect, useRef, useState } from 'react';

const TabContext = React.createContext();

export default function Tabs({align = "horizontal", onChange = ((index) => {}), defaultTab = 0, children, ...restProps }) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [tabIndices, setTabIndices] = useState([]);
    const alignRef = useRef(align);

    useEffect(() => {
        onChange(activeTab);
    }, [activeTab]);

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab, tabIndices, setTabIndices, align: alignRef.current}}>
            <div className={(alignRef.current == "horizontal")? "flex flex-col w-full" : (alignRef.current == "vertical")? "flex flex-row h-full": "flex flex-col w-full" } {...restProps}>
                {children}
            </div>
        </TabContext.Provider>
    );
}

Tabs.TabList = function TabsTabList({ children, ...restProps }) {
    const {setTabIndices, align} = useContext(TabContext);

    const childrenWithIndex = React.Children.map(children, (child, index) => {
        return React.cloneElement(child, { tabIndex: child.props.tabIndex || index });
    });

    useEffect(() => {
        setTabIndices(React.Children.map(children, (child, index) => {
            return child.props.tabIndex || index;
        }));
    }, []);

    return (
        <ul className={(align === 'horizontal')? "flex flex-wrap text-sm font-medium text-center w-fit text-gray-500 border-b border-gray-200":(align === 'vertical')? "flex flex-col space-y-2 flex-wrap w-fit text-sm border-r border-gray-200": "flex flex-wrap w-fit text-sm font-medium text-center text-gray-500 border-b border-gray-200"} {...restProps}>
            {childrenWithIndex}
        </ul>
    );
};

Tabs.Tab = function TabsTab({ tabIndex, children, ...restProps }) {
    const { activeTab, setActiveTab } = useContext(TabContext);

    const [active, setActive] = useState(tabIndex === activeTab);

    useEffect(() => {
        setActive(activeTab === tabIndex);
    }, [activeTab, tabIndex]);

    const handleClick = () => {
        setActiveTab(tabIndex);
    };

    return (
        <li
            onClick={handleClick}
            className={active ? "me-2 inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg" : "me-2 inline-block p-4 text-blue-600 bg-transparent rounded-t-lg hover:bg-gray-300 hover:rounded-t-lg"}
            {...restProps}
        >
            {children}
        </li>
    );
};

Tabs.TabPanel = function TabsTabPanel({ tabIndex, children, ...restProps }) {
    const { activeTab } = useContext(TabContext);
    const [active, setActive] = useState(activeTab === tabIndex);


    useEffect(() => {
        setActive(activeTab === tabIndex);
    }, [activeTab, tabIndex]);

    return (
        <div className={active ? "flex flex-row" : "hidden"} {...restProps}>
            {children}
        </div>
    );
};

Tabs.TabPanels = function TabsTabPanels({ children, ...restProps }) {
    const { tabIndices } = useContext(TabContext);

    const childrenWithIndex = React.Children.map(children, (child, index) => {
        return React.cloneElement(child, { tabIndex: child.props.tabIndex || tabIndices[index] });
    });

    return (
        <div className="flex flex-row" {...restProps}>
            {childrenWithIndex}
        </div>
    );
};
