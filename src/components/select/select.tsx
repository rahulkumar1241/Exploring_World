import React from "react";
import "./select.scss";

const Dropdown = (props: any) => {

    const { onChange, options, value } = props;

    return <React.Fragment>
        <div className="mySelect">
            <select name="cars" id="cars" value={value} onChange={onChange}>
                {
                    options?.map((data: any) => {
                        return <option className="options" value={data.value}>{data.label}</option>
                    })
                }
            </select>
        </div>
    </React.Fragment>
}
export default Dropdown;
