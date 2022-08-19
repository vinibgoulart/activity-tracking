import React from "react";

export default function CardProject(props) {

    return (
        <div className="flex items-center justify-center items-center">
            <div className="w-full max-w-lg mx-4">
                <div className="bg-white shadow-md w-full rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex-col justify-around">
                        <div>
                            <strong>{props.name}</strong>
                        </div>
                        <div>
                            <small>{props.description}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}