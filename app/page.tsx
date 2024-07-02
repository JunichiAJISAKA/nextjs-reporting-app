'use client';
import type {NextPage} from "next";
import React, {useEffect} from "react";
import {ViewerWrapperProps} from "../components/ReportViewer";

// 動的インポートを使用して、レポートビューワのラッパーをロードします。詳細については、「https://nextjs.org/docs/advanced-features/dynamic-import」を参照してください。
import dynamic from "next/dynamic";

const Viewer = dynamic<ViewerWrapperProps>(
    async () => {
        return (await import("../components/ReportViewer")).default;
    },
    {ssr: false}
);

const Home: NextPage = () => {
    const [canShow, setCanShow] = React.useState(false);
    useEffect(() => {
        if(!window || typeof window === 'undefined') return;
        setCanShow(true);
    },[]);

    return (
        <div
            style={{width: "100%", height: "100vh"}}
        >
            {canShow &&
                <Viewer reportUri="reports/Invoice_green_ipa.rdlx-json" language="ja"/>
            }
        </div>
    );
};

export default Home;
