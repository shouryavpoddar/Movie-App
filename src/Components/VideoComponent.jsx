import React from 'react';
export default function VideoComponent({youtubeID}) {

    return (
        <React.Suspense fallback={<div className={"animate-pulse rounded-2xl flex aspect-[36/10] w-5/6 m-0"}>Loading...</div>}>
            <iframe className=' rounded-2xl flex aspect-[36/10] w-5/6 m-0 '
                    title='Youtube player'
                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                    src={`https://youtube.com/embed/${youtubeID}?autoplay=0`}>
            </iframe>
        </React.Suspense>
    )
}