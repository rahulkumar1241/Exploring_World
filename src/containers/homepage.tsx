import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { getAllHomepageData, getCountriesByRegion, getCountryData } from "../store/slices/homepage";
import Card from "../components/card/card";
import "../assets/css/homepage.scss";
import SearchInput from "../components/searchinput/input";
import Loading from "../components/loader/loader";
import Dropdown from "../components/select/select";

const Homepage = () => {

    const [search, setSearch]: any = useState("");
    const [region, setRegion]: any = useState("");

    const options: any = [
        {
            value: "",
            label: "Filter By Region"
        },
        {
            value: "africa",
            label: "Africa"
        },
        {
            value: "america",
            label: "America"
        },
        {
            value: "asia",
            label: "Asia"
        },
        {
            value: "europe",
            label: "Europe"
        },
        {
            value: "oceania",
            label: "Oceania"
        }
    ]

    const dispatch = useAppDispatch();

    const { loadingHomepageData, homepageData, loadingGetCountryBySearch, loadingGetCountriesByRegion } = useAppSelector(state => state.homepage);


    const getData = async () => {
        let response = await dispatch(getAllHomepageData({}));
    }


    const getDataBySearchFunc = async (search_value: any) => {
        let response = await dispatch(getCountryData({
            search: search_value
        }));
    }

    useEffect(() => {
        let getDataBySearchId: any;
        if (search) {
            getDataBySearchId = setTimeout(() => {
                getDataBySearchFunc(search);
            }, 1000)
        } else {
            getData();
        }
        return () => clearTimeout(getDataBySearchId);
    }, [search]);




    const onChange = async (e: any) => {
        let value = e.target.value;
        setSearch(value)
        ////////////////////////////
    }


    const onChangeSelect = async (region: any) => {
        if (region) {
            let response = await dispatch(getCountriesByRegion({
                region: region
            }));
        } else {
            getData();
        }
    }

    return <React.Fragment>
        {loadingHomepageData || loadingGetCountryBySearch || loadingGetCountriesByRegion ? <Loading loading={true} /> : ""}
        <div className="homepage">
            <div className="row">

                <div className="col-12 mt-3 filter-section" >

                    <div className="col-xs-12 col-md-5 col-lg-5 col-xl-5 ">
                        <SearchInput
                            value={search}
                            onChange={onChange}
                        />
                    </div>

                    <div className="col-xs-12 col-md-5 col-lg-5 col-xl-5">

                    </div>
                    <div className="col-xs-5 col-md-2 col-lg-2 col-xl-2 dropdown">
                        <Dropdown
                            options={options}
                            onChange={(e: any) => { onChangeSelect(e.target.value) }}
                        />
                    </div>
                </div>

                {homepageData.map((value: any, index: any) => {
                    return <div className="col-xs-12 col-md-3 col-lg-3 col-xl-3">
                        <Card data={value} />
                    </div>
                })}

                <div className="col-12 d-flex justify-content-center mt-3">
                    <p>{homepageData.length ? "":"No Data Found"}</p>
                </div>
            </div>
        </div>
    </React.Fragment>

}
export default Homepage;