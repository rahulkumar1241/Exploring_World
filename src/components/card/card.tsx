import React from "react";
import "./card.scss";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../paths/path";

const Card = (props: any) => {
    const navigate = useNavigate();

    let country_info: any = {};
    country_info['url'] = props.data.flags.png;
    country_info['country_name'] = props.data.name.official;
    country_info['population'] = props.data.population;
    country_info['region'] = props.data.region;
    country_info['capital'] = props.data.capital?.[0] ? props.data.capital[0] : "";

    const rediectToMoreInfo = (data: any) => {
        navigate(PATH.PUBLIC.SPECIFIC_COUNTRY_INFO+"/"+data.name.official,
            {
                state: {
                    country_data:data
                }
            }
        )
    }


    return <React.Fragment>
        <div className="card"
            onClick={(e: any) => rediectToMoreInfo(props.data)}>
            <img src={country_info.url} alt="" />


            <div className="info">
                <p className="title mt-3">{country_info.country_name}</p>

                <div className="sub-info">
                    <span className="title">Population:</span>
                    <span className="value">{new Intl.NumberFormat('en-US').format(country_info.population)}</span>
                </div>

                <div className="sub-info">
                    <span className="title">Region:</span>
                    <span className="value">{country_info.region}</span>
                </div>

                <div className="sub-info">
                    <span className="title">Capital:</span>
                    <span className="value">{country_info.capital}</span>
                </div>
            </div>
        </div>
    </React.Fragment>
}
export default Card;