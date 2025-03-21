'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiCalendar, FiClock, FiMail, FiInfo } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Theme Configuration updated as per request
const theme = {
  primary: '#FF007A',       // Bright Pink for styling accents
  secondary: '#FFFFFF',     // White for backgrounds
  headingColor: '#8B0045',  // Dark Pink for headings
  background: '#FFFFFF',    // Light neutral background for page
  text: '#8B0045',          // Use dark pink for form text
  cardBg: '#FFFFFF'         // White background for the reservation box
};

// Global Animations
const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background: ${theme.background};
    color: ${theme.text};
    overflow-x: hidden;
  }

  *::selection {
    background: ${theme.primary};
    color: ${theme.secondary};
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  background: 
    radial-gradient(circle at 10% 20%, ${theme.primary}20, transparent 30%),
    radial-gradient(circle at 90% 80%, ${theme.secondary}20, transparent 30%);
    
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const HeaderSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 1rem;

  h1 {
    font-size: 3.5rem;
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    font-family: 'Pacifico', cursive;
    color: ${theme.headingColor};
    margin-bottom: 1.5rem;
    letter-spacing: -0.03em;
    filter: drop-shadow(0 4px 8px ${theme.primary}40);
  }

  p {
    color: ${theme.text}90;
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const FormCard = styled(motion.div)`
  background: ${theme.cardBg};
  border-radius: 30px;
  padding: 3.5rem;
  @media (max-width: 768px) {
    padding: 2rem;
  }
  border: 1px solid ${theme.primary};
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  box-shadow:
    0 8px 32px ${theme.primary}10,
    0 0 40px ${theme.primary}05 inset;
`;

const InputGroup = styled.div`
  position: relative;
  margin: 2rem 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-3px);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1.4rem 1.4rem 1.4rem 4rem;
  border: 2px solid ${theme.primary}40;
  border-radius: 15px;
  font-size: 1.05rem;
  color: ${theme.text};
  transition: all 0.3s ease;
  background: ${theme.secondary};
  
  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 25px ${theme.primary}20;
  }

  &::placeholder {
    color: ${theme.text}80;
    font-weight: 300;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: ${theme.secondary};
  background: ${theme.primary}20;
  padding: 10px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  ${InputGroup}:hover & {
    background: ${theme.primary}30;
    color: ${theme.text};
  }
`;

const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.2rem;
  margin: 2rem 0;
`;

// New responsive grid component to replace inline grid layouts
const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TimeSlotButton = styled(motion.button)<{ selected?: boolean }>`
  background: ${props => props.selected 
    ? `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.primary} 100%)` 
    : theme.secondary};
  color: ${props => props.selected ? theme.text : `${theme.text}90`};
  padding: 1rem;
  border: 2px solid ${props => props.selected ? theme.primary : `${theme.primary}40`};
  border-radius: 15px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${theme.primary}20;
  }
`;

const GuestCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: ${theme.secondary};
  border-radius: 15px;
  padding: 1rem;
  border: 2px solid ${theme.primary}40;
`;

const CounterButton = styled(motion.button)`
  background: ${theme.primary};
  color: ${theme.secondary};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
`;

const SpecialRequestBox = styled.textarea`
  width: 100%;
  height: 140px;
  padding: 1.5rem;
  border: 2px solid ${theme.primary}40;
  border-radius: 15px;
  resize: none;
  color: ${theme.text};
  background: ${theme.secondary};
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 25px ${theme.primary}20;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, ${theme.secondary} 0%, ${theme.primary} 100%);
  color: ${theme.text};
  padding: 1.4rem 5rem;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: block;
  margin: 3rem auto 0;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background-size: 200% auto;

  &:hover {
    background-position: right center;
    animation: ${gradientFlow} 2s ease infinite;
    box-shadow: 0 8px 25px ${theme.primary}30;
  }
`;

const FloatingDecoration = styled(motion.div)`
  position: absolute;
  background: linear-gradient(45deg, ${theme.primary}20, ${theme.secondary}20);
  border-radius: 20px;
  filter: blur(30px);
  opacity: 0.4;
  z-index: 0;
`;

const SuccessPopup = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${theme.cardBg};
  color: ${theme.text};
  padding: 1.8rem 3.5rem;
  border-radius: 20px;
  box-shadow: 0 12px 40px ${theme.primary}30;
  z-index: 1000;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid ${theme.primary}30;
  backdrop-filter: blur(15px);

  &::before {
    content: '✓';
    font-size: 1.8rem;
    color: ${theme.primary};
    font-weight: 700;
  }
`;

const GlobalDatePickerStyles = createGlobalStyle`
  .react-datepicker {
    background: ${theme.secondary};
    border: 1px solid ${theme.primary}40;
    border-radius: 15px;
    box-shadow: 0 8px 32px ${theme.primary}10;
    overflow: hidden;
  }

  .react-datepicker__header {
    background: ${theme.secondary};
    border-bottom: 1px solid ${theme.primary}40;
  }

  .react-datepicker__day {
    color: ${theme.text};
    &:hover {
      background: ${theme.primary}20 !important;
    }
    &--selected {
      background: ${theme.primary};
      color: ${theme.secondary};
    }
  }

  .react-datepicker__current-month {
    color: ${theme.text};
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${theme.text};
  }
`;

const ReservationPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [date, setDate] = useState<Date | null>(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '01:00', '02:00','03:00','04:00', '05:00','06:00'];

  const onSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <GlobalStyle />
      <GlobalDatePickerStyles />
      <PageContainer>
        <FloatingDecoration
          style={{ top: '15%', left: '10%', width: '200px', height: '200px' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        
        <HeaderSection
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1>Exclusive Dining Experience</h1>
          <p>
            Reserve your table at our Michelin-starred restaurant. 
            Experience culinary perfection in an intimate setting.
          </p>
        </HeaderSection>

        <FormCard
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.5 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input Fields */}
            <TwoColumnGrid>
              <InputGroup>
                <IconWrapper>
                  <FiUser size={22} />
                </IconWrapper>
                <StyledInput
                  {...register('name', { required: true })}
                  placeholder="Full Name"
                  style={{ borderColor: errors.name ? theme.primary : '' }}
                />
              </InputGroup>

              <InputGroup>
                <IconWrapper>
                  <FiMail size={22} />
                </IconWrapper>
                <StyledInput
                  {...register('email', { 
                    required: true,
                    pattern: /^\S+@\S+$/i 
                  })}
                  placeholder="Email Address"
                  type="email"
                  style={{ borderColor: errors.email ? theme.primary : '' }}
                />
              </InputGroup>
            </TwoColumnGrid>

            {/* Date and Time Section */}
            <TwoColumnGrid>
              <InputGroup>
                <IconWrapper>
                  <FiCalendar size={22} />
                </IconWrapper>
                <DatePicker
                  selected={date}
                  onChange={(date: Date | null) => setDate(date)}
                  customInput={<StyledInput />}
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                />
              </InputGroup>

              <InputGroup>
                <IconWrapper>
                  <FiClock size={22} />
                </IconWrapper>
                <StyledInput
                  placeholder="Select Time"
                  value={timeSlot}
                  readOnly
                  style={{ cursor: 'pointer' }}
                />
              </InputGroup>
            </TwoColumnGrid>

            {/* Time Slots Grid */}
            <TimeSlotGrid>
              {timeSlots.map((time) => (
                <TimeSlotButton
                  key={time}
                  selected={timeSlot === time}
                  onClick={() => setTimeSlot(time)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {time}
                </TimeSlotButton>
              ))}
            </TimeSlotGrid>

            {/* Guest Counter and Phone */}
            <TwoColumnGrid>
              <InputGroup>
                <GuestCounter>
                  <CounterButton
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </CounterButton>
                  <span style={{ fontSize: '1.4rem' }}>{guests}</span>
                  <CounterButton
                    type="button"
                    onClick={() => setGuests(guests + 1)}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </CounterButton>
                </GuestCounter>
              </InputGroup>

              <InputGroup>
                <IconWrapper>
                  <FiInfo size={22} />
                </IconWrapper>
                <StyledInput
                  {...register('phone')}
                  placeholder="Contact Number"
                  type="tel"
                />
              </InputGroup>
            </TwoColumnGrid>

            {/* Special Requests */}
            <InputGroup>
              <SpecialRequestBox
                {...register('requests')}
                placeholder="Special requests (dietary restrictions, celebrations, seating preferences...)"
              />
            </InputGroup>

            {/* Submit Button */}
            <SubmitButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              type="submit"
            >
              Secure Reservation
            </SubmitButton>
          </form>

          {/* Success Animation */}
          <AnimatePresence>
            {submitted && (
              <SuccessPopup
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                Reservation Confirmed!
              </SuccessPopup>
            )}
          </AnimatePresence>
        </FormCard>
      </PageContainer>
    </>
  );
};

export default ReservationPage;
