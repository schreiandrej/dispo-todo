export const Forms = () => {
  return (
    <div className="">
      <h2 className="text-2xl font-bold">Underline</h2>
      <div className="max-w-md mt-8">
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-gray-700">What type of event is it?</span>
            <select className="underlined-select">
              <option>Corporate event</option>
              <option>Wedding</option>
              <option>Birthday</option>
              <option>Other</option>
            </select>
          </label>
          <input type="text" className="solid-input" />
          <label className="block">
            <span className="text-gray-700">Additional details</span>
            <textarea className="underlined-input" rows={2}></textarea>
          </label>
          <div className="block">
            <div className="mt-2">
              <div>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="simple-checkbox" />
                  <span className="ml-2">Email me news and special offers</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
