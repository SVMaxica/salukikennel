import { useState } from 'react';
import Modal from './Modal';

interface NewsletterSignupProps {
  buttonText: string;
}

// Main component
const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ buttonText }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});

  // Function to handle button click and open modal
  const handleButtonClick = () => {
    setIsModalVisible(true);
  };

  // Function to handle closing modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEmail('');
    setName('');
    setErrors({});
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { email?: string; name?: string } = {};
    let hasError = false;

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
      hasError = true;
    }

    // Validate name
    if (!name) {
      newErrors.name = 'Name is required';
      hasError = true;
    }

    setErrors(newErrors);

    // If no errors, submit the form
    if (!hasError) {
      (e.target as HTMLFormElement).submit();
    }
  };

  // Function to get input border class based on validation state
  const getInputBorderClass = (inputValue: string, errorMessage?: string) => {
    if (errorMessage) {
      return 'border-red-500 border-2';
    }
    if (inputValue) {
      return 'border-green-500 border-2';
    }
    return 'border-gray-300 border';
  };

  return (
    <div className="newsletter-signup">
      <button
        onClick={handleButtonClick}
        className="bg-liberty hover:bg-midnight-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {buttonText}
      </button>

      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <div id="mc_embed_shell">
          <div id="mc_embed_signup" className="w-full max-w-lg mx-auto bg-baby-powder p-6 rounded-lg">
            <form
              // Change the action URL to connect to another Mailchimp account and it must match the name in the area hidden(row 155) to avoid bot from mailchimp.
              action="https://ventoveloce.us14.list-manage.com/subscribe/post?u=1b21b2e0412b36495ba038e94&amp;id=f1acf3ef6c&amp;f_id=00c5fde1f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              noValidate
              onSubmit={handleSubmit}
            >
              <div id="mc_embed_signup_scroll">
                <h2 className="text-2xl font-bold font-lora text-liberty mb-4">Sign up to our Puppie newsletter!</h2>
                <div className="indicates-required text-center text-gray-400 mb-4">
                  <span className="asterisk text-red-700">*</span> indicates required
                </div>
                <div className="mc-field-group mb-4">
                  <label htmlFor="mce-EMAIL" className="block text-sm font-medium text-gray-700">
                    Email Address <span className="asterisk text-red-700">*</span>
                  </label>
                  <input
                    type="email"
                    name="EMAIL"
                    className={`required email rounded-lg p-2 block w-full ${getInputBorderClass(email, errors.email)}`}
                    id="mce-EMAIL"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (!/\S+@\S+\.\S+/.test(e.target.value)) {
                        setErrors((prevErrors) => ({ ...prevErrors, email: 'Email address is invalid' }));
                      } else {
                        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
                      }
                    }}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby="email-error"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mc-field-group mb-4">
                  <label htmlFor="mce-FNAME" className="block text-sm font-medium text-gray-700">
                    Name <span className="asterisk text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    name="FNAME"
                    className={`required text rounded-lg p-2 mt-1 block w-full ${getInputBorderClass(name, errors.name)}`}
                    id="mce-FNAME"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!e.target.value) {
                        setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
                      } else {
                        setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
                      }
                    }}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby="name-error"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div id="mce-responses" className="clear foot mb-4">
                  <div className="response hidden" id="mce-error-response"></div>
                  <div className="response hidden" id="mce-success-response"></div>
                </div>
                <div aria-hidden="true" className="absolute left-[-5000px]">
                  <input type="text" name="b_1b21b2e0412b36495ba038e94_f1acf3ef6c" tabIndex={-1} defaultValue="" />
                </div>
                {/* Very important the above name must match the mailchimp account */}
                <div className="optionalParent">
                  <div className="clear foot">
                    <input
                      type="submit"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      className="button bg-liberty hover:bg-midnight-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                      value="Subscribe"
                    />
                    <p className="text-center mt-4">
                      <a href="http://eepurl.com/iWnVVU" title="Mailchimp - email marketing made easy and fun">
                        <span className="inline-block bg-transparent rounded">
                          <img
                            className="refferal_badge"
                            src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                            alt="Intuit Mailchimp"
                            style={{ width: '220px', height: '40px', display: 'flex', padding: '2px 0px', justifyContent: 'center', alignItems: 'center' }}
                          />
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
                <div className="bottom-info text-center text-gray-400 mb-4">
                  <span className="signoff info"></span>We will only send you an email when we release new puppy plans and you can unsubscribe from the newsletter at any time by using the link at the bottom of the emails🐶
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewsletterSignup;






