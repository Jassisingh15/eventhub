import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowRight, FaTicketAlt } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, verifyOTP } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!showOTP) {
        // Step 1: login with email and password
        await login(email, password);
        navigate('/dashboard');
      } else {
        // Step 2: verify the OTP that was emailed to the user
        await verifyOTP(email, otp);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.needsVerification) {
        setShowOTP(true);
      } else {
        setError(typeof error === 'string' ? error : 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-[#182335]/10 bg-white shadow-xl lg:grid-cols-2">
      {/* LEFT PANEL (desktop only) */}
      <div className="hidden min-h-[620px] flex-col justify-between bg-[#182335] p-12 text-white lg:flex">
        <div className="flex items-center gap-2 text-xl font-extrabold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ea6249]">
            <FaTicketAlt />
          </span>
          Eventora
        </div>

        <div>
          <p className="eyebrow !text-[#ff9a85]">Welcome back</p>

          <h1 className="mt-4 font-serif text-5xl leading-tight">
            The plans you’ll remember are waiting.
          </h1>

          <p className="mt-5 max-w-sm leading-7 text-white/60">
            Pick up right where you left off and keep your next experience close.
          </p>
        </div>

        <p className="text-xs text-white/40">Discover · Connect · Experience</p>
      </div>

      {/* RIGHT PANEL - form */}
      <div className="p-7 sm:p-12">
        <p className="eyebrow">Your Eventora account</p>

        <h2 className="mt-3 font-serif text-4xl">Sign in</h2>

        <p className="mt-3 text-sm text-[#182335]/60">
          New here? <Link className="font-bold text-[#ea6249]" to="/register">Create an account</Link>
        </p>

        {error && (
          <p className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {!showOTP ? (
            <>
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
            {loading ? 'Processing...' : showOTP ? 'Verify & sign in' : (
              <>Sign in <FaArrowRight /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
