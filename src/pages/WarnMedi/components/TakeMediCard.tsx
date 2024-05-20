type Props = {};

const TakeMediCard = (props: Props) => {
  return (
    <section>
      <h1 className="m-5 text-2xl ">복용 중인 약</h1>
      <div className="flex rounded-lg bg-white ">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <div className="card p-4">
              <div className="w-full overflow-hidden rounded-lg">
                <img src="https://github.com/yejinie/yejinie/assets/69359751/d7dc47f8-c68a-4599-943d-132b4a01da89" />
              </div>
              <div className="mt-4 flex justify-between px-4 text-sm">
                <div>
                  <h3 className=" text-gray-700">타이레놀콜드-에스정</h3>
                </div>
                <div>
                  <input id="default-checkbox" type="checkbox" value="" />
                </div>
              </div>
            </div>

            <div className="card p-4">
              <div className="w-full overflow-hidden rounded-lg">
                <img src="https://github.com/yejinie/yejinie/assets/69359751/d7dc47f8-c68a-4599-943d-132b4a01da89" />
              </div>
              <div className="mt-4 flex justify-between px-4 text-sm">
                <div>
                  <h3 className="text-gray-700">타이레놀콜드-에스정</h3>
                </div>
                <div>
                  <input id="default-checkbox" type="checkbox" value="" />
                </div>
              </div>
            </div>

            <div className="card p-4">
              <div className="w-full overflow-hidden rounded-lg">
                <img src="https://github.com/yejinie/yejinie/assets/69359751/d7dc47f8-c68a-4599-943d-132b4a01da89" />
              </div>
              <div className="mt-4 flex justify-between px-4 text-sm">
                <div>
                  <h3 className="text-gray-700">타이레놀콜드-에스정</h3>
                </div>
                <div>
                  <input id="default-checkbox" type="checkbox" value="" />
                </div>
              </div>
            </div>

            <div className="card p-4">
              <div className="w-full overflow-hidden rounded-lg">
                <img src="https://github.com/yejinie/yejinie/assets/69359751/d7dc47f8-c68a-4599-943d-132b4a01da89" />
              </div>
              <div className="mt-4 flex justify-between px-4 text-sm">
                <div>
                  <h3 className="text-gray-700">타이레놀콜드-에스정</h3>
                </div>
                <div>
                  <input id="default-checkbox" type="checkbox" value="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TakeMediCard;
