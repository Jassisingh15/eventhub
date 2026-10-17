import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowRight, FaTicketAlt } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, verifyOTP } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!showOTP) {
        // Step 1: create the account, which emails an OTP code
        await register(name, email, password);
        setShowOTP(true);
      } else {
        // Step 2: verify the OTP to activate the account
        await verifyOTP(email, otp);
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-[#182335]/10 bg-white shadow-xl lg:grid-cols-2">
      {/* LEFT PANEL (desktop only) */}
      <div className="order-2 hidden min-h-[620px] flex-col justify-between bg-[#dce8e4] p-12 lg:flex">
        <div className="flex items-center gap-2 text-xl font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ea6249] text-white">
            <FaTicketAlt />
          </span>
          Eventora
        </div>

        <div>
          <p className="eyebrow">Make plans that matter</p>

          <h1 className="mt-4 font-serif text-5xl leading-tight">
            A better way to spend your time.
          </h1>

          <p className="mt-5 max-w-sm leading-7 text-[#182335]/65">
            Join a community that believes the best days are shared.
          </p>
        </div>

        <p className="text-xs text-[#182335]/45">Your next story starts here.</p>
      </div>

      {/* RIGHT PANEL - form */}
      <div className="order-1 p-7 sm:p-12">
        <p className="eyebrow">Join Eventora</p>

        <h2 className="mt-3 font-serif text-4xl">Create your account</h2>

        <p className="mt-3 text-sm text-[#182335]/60">
          Already a member? <Link className="font-bold text-[#ea6249]" to="/login">Sign in</Link>
        </p>

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {!showOTP ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-bold">Full name</label>
                <input
                  className="field"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">Email address</label>
                <input
                  className="field"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">Password</label>
                <input
                  className="field"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </>
          ) : (
            <div>
              <p className="mb-4 rounded-xl bg-[#dce8e4] p-3 text-sm">
                We sent a verification code to your email.
              </p>

              <label className="mb-2 block text-sm font-bold">Verification code</label>
              <input
                className="field text-center text-lg font-bold tracking-[0.4em]"
                type="text"
                required
                placeholder="6-digit code"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                maxLength="6"
              />
            </div>
          )}

          <button disabled={loading} className="button-primary w-full !py-4">
            {loading ? 'Processing...' : showOTP ? 'Verify & complete' : (
              <>Create account <FaArrowRight /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
