import React, { useState, useEffect } from 'react';
import { Cover, Grid } from '../lib';
import defJPG from '../User/avatar.jpg';

export function ExampleCover() {
    const [src, setSrc] = useState();

    useEffect(() => {
        const baiduLogo = 'https://www.baidu.com/img/flexible/logo/pc/result.png';
        const image = new Image();
        
        image.src = baiduLogo;
        image.onload = () => {
            setSrc(baiduLogo);
            image.onload = image.onerror = null;
        }
        image.onerror = () => {
            setSrc(undefined);
            image.onload = image.onerror = null;
        }
    }, []);

    return (
        <>
            <Grid>
                <Grid span={3}><Cover src={src} /></Grid>
                <Grid span={3}><Cover src={defJPG} /></Grid>
                <Grid span={3}><Cover src={defJPG} ratio={1.5} /></Grid>
            </Grid>
        </>
    );
}
