"use client"

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import useIsMobile from "@/components/useIsMobile";
import {useEffect} from "react";

function Dashboard() {
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error('error');
            }
            return response.json();
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    const isMobile = useIsMobile();
    const BAR_NEW_OPTIONS = {
        chart: {
            /**General options for the chart.*/
            type: "column" //The default series type for the chart.
        },
        title: {
            /**The chart's main title.*/
            text: "Search Engine Usage",
            align: "left", //align to left of the container
            style: {
                fontWeight: "bold"
            }
        },
        xAxis: {
            /**this is the horizontal axis */
            categories: ["Search Engine", "Marketplace"]
        },
        yAxis: {
            /** this is the vertical axis */
            min: 0,
            title: {
                text: ""
            }
        },
        legend: {
            /**The legend is a box containing a symbol and name for each series item or point item in the chart  */
            enabled: false
        },
        plotOptions: {
            /**The plotOptions is a wrapper object for config objects for each series type.  */
            series: {
                /**general options for all series */
                stacking: "normal"
            }
        },
        series: [
            /**Series options for specific data and the data itself */
            {
                data: [
                    { y: 6, name: "Search Engine", color: "blue" },
                    { y: 7, name: "MarketPlace", color: "green" },
                ]
            }
        ]
    };

    return <div className="w-[90%] m-auto pt-[30px]">
        <div align="center" className="text-[40px] font-bold">Dashboard</div>
        <div className="grid grid-cols-4 mt-[35px] gap-4">
            <Item title="Total Users" value="4575"/>
            <Item title="Montly Active" value="1336"/>
            <Item title="Total Input Tokens" value="2074800"/>
            <Item title="Total Output Tokens" value="1333800"/>
        </div>
        <div className="grid grid-cols-4 mt-[35px] gap-4">
            <div className="col-span-3" align="center">
                <div
                    style={{
                        width: !isMobile ? "50%" : "100%",
                        margin: "auto"
                    }}
                >
                    <HighchartsReact highcharts={Highcharts} options={BAR_NEW_OPTIONS}
                    />
                </div>
            </div>
            <Item title="Cost to date" value="$375"/>
        </div>
    </div>
}

function Item({title, value}) {
    return <div className="rounded-[20px] border border-gray h-[160px]">
        <div className="border-b border-gray pt-[15px] pb-[15px] text-[20px] font-bold" align="center">{title}</div>
        <div className="pt-[25px] pb-[25px]  text-[25px] font-bold" align="center">{value}</div>
    </div>
}

export default  Dashboard;