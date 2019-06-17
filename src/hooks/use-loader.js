import { useState, useEffect } from 'react';

export default (setup, saveHandler) => {
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);

  const handleSave = async (props) => {
    // start loading
    setSuccess(false);
    setLoading(true);

    // handle callback
    saveHandler(props);

    // stop loading
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setup();
      setLoading(false);
    };
    init();
  }, []);

  return { handleSave, loading, success };
};
