import ClassNames from "./ImageCompressor.module.css";

const Steps = () => {
    let steps = ['Upload Image', 'Click on Compress', 'DownLoad Compressed Image']
    return (
        <section className={ClassNames.StepsContainer}>
            <h1> Three Simple Steps Steps :: </h1>
            {steps.map((element, index) => {
                return (
                    <h2 key={index}> {index + 1} - {element} . </h2>
                )
            })}
        </section>
    )
}

export default Steps