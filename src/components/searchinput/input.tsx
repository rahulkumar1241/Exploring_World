import React from "react";
import "./input.scss";
import { IoMdSearch } from "react-icons/io";

const SearchInput = (props: any) => {


    const { value, onChange } = props;

    return <React.Fragment>
        <div className="search_input">

            <input
                type="text"
                className="icon-rtl"
                value={value}
                onChange={onChange}
                placeholder="Search for a country..." />

            <div className="icon">
                <IoMdSearch />
            </div>
        </div>
    </React.Fragment>
}

export default SearchInput;