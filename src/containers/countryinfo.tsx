import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import "../assets/css/countryinfo.scss";
import { IoMdArrowBack } from "react-icons/io";


const CountryInfo = (props: any) => {
    const navigate = useNavigate();

    let location = useLocation();
    const country_data = location.state.country_data;

    let Languages = "";
    let Currencies = "";

    Object.keys(country_data.currencies).forEach((key: any, index: any) => {
        Currencies += country_data.currencies[key].name;
        if (index != Object.keys(country_data.currencies).length - 1) {
            Currencies += ","
        }
    })


    Object.keys(country_data.languages).forEach((key: any, index: any) => {
        Languages += country_data.languages[key];

        if (index != Object.keys(country_data.languages).length - 1) {
            Languages += ","
        }
    })


    const goToHome = () => {
        navigate("/")
    }

    return <React.Fragment>
        <div className="country_info">



            <div className="row">
                <div className="col-12 backBtnContainer">
                    <span className="BackBtn" onClick={goToHome}>
                        <IoMdArrowBack /> Back
                    </span>
                </div>
                <div className="col-xs-12 col-md-6 col-lg-6 col-xl-6">
                    <img src={country_data.flags.png} alt="" />
                </div>

                <div className="col-xs-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="col-12">
                        <p className="title">
                            {country_data.name.official}
                        </p>
                    </div>
                    <div className="info">
                        <div className="col-xs-12 col-md-6 col-lg-6 col-xl-6 section-one">
                            <div className="sub-info">
                                <span className="title">Native Name:</span>
                                <span className="value">{country_data.name.common}</span>
                            </div>

                            <div className="sub-info">
                                <span className="title">Population:</span>
                                <span className="value">{new Intl.NumberFormat('en-US').format(country_data.population)}</span>
                            </div>

                            <div className="sub-info">
                                <span className="title">Region:</span>
                                <span className="value">{country_data.region}</span>
                            </div>

                            <div className="sub-info">
                                <span className="title">Sub Region:</span>
                                <span className="value">{country_data.subregion}</span>
                            </div>

                            <div className="sub-info">
                                <span className="title">Capital:</span>
                                <span className="value">{country_data.capital[0]}</span>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-6 col-lg-6 col-xl-6 section-two">
                            <div className="sub-info">
                                <span className="title">Top Level Domain:</span>
                                <span className="value">{country_data.tld[0]}</span>
                            </div>

                            <div className="sub-info">
                                <span className="title">Currencies:</span>
                                <span className="value">{Currencies ? Currencies : "N/A"}</span>
                            </div>

                            <div className="sub-info">
                                <span className="title">Languages:</span>
                                <span className="value">{Languages ? Languages : "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="border-countries-info">
                            <span className="title">Border Countries:</span>

                            <div className="values">
                                {country_data?.borders?.map((value: any, index: any) => {
                                    return <span className="chip">{value}</span>
                                })}
                                <p className="noValues">{country_data?.borders ? "":"No Border Countries Found"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>

}
export default CountryInfo;