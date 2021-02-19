import React from 'react';

type Props = {
    imageId: string;
}

export const MessageRealizationImage: React.FC<Props> = (props: Props) => {
    return (
        <img style={{
            width: '100%', height: '20%'
        }} src={'http://tpi-back.recursion.ru:8080/tpi-system/api/v1/images/' + props.imageId} alt="" />
    )
}