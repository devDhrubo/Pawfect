
const Title = ({subHeading, heading}) => {
    return (
        <div>
            <div className="md:w-4/12 mx-auto text-center my-6">
                <p className="text-yellow-600 mb-2 italic">--- {subHeading} ---</p>
                <h3 className="text-3xl uppercase border-y-4 py-3">{heading}</h3>
            </div>
        </div>
    );
};

export default Title;