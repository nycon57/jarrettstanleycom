-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name VARCHAR(255) NOT NULL,
  author_title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('speaking', 'consulting', 'general')),
  event_name VARCHAR(255),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create speaking_events table
CREATE TABLE IF NOT EXISTS speaking_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  venue VARCHAR(255),
  topic VARCHAR(500) NOT NULL,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('keynote', 'panel', 'workshop', 'webinar')),
  registration_url TEXT,
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_testimonials_service_type ON testimonials(service_type);
CREATE INDEX idx_speaking_events_date ON speaking_events(event_date);
CREATE INDEX idx_speaking_events_featured ON speaking_events(is_featured);

-- Add RLS policies
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE speaking_events ENABLE ROW LEVEL SECURITY;

-- Allow public read access to testimonials
CREATE POLICY "Allow public read access to testimonials" 
  ON testimonials FOR SELECT 
  USING (true);

-- Allow public read access to speaking events
CREATE POLICY "Allow public read access to speaking events" 
  ON speaking_events FOR SELECT 
  USING (true);

-- Insert sample data for development
INSERT INTO testimonials (author_name, author_title, company, content, rating, service_type, event_name) VALUES
  ('Sarah Johnson', 'Conference Director', 'Mortgage Bankers Association', 'Jarrett''s keynote on AI in mortgage marketing was the highlight of our conference. His ability to make complex technology accessible and actionable for our audience was exceptional.', 5, 'speaking', 'MBA Annual 2023'),
  ('Michael Chen', 'CEO', 'Digital Lending Solutions', 'One of the most engaging speakers we''ve had. Jarrett''s real-world examples and practical insights on digital transformation gave our team a clear roadmap for implementation.', 5, 'speaking', 'Digital Mortgage Conference'),
  ('Amanda Martinez', 'VP of Marketing', 'First National Mortgage', 'The session on building compliant AI systems was eye-opening. Jarrett presented complex compliance issues in a way that made sense for both technical and non-technical attendees.', 5, 'speaking', 'Compliance Summit 2023');

INSERT INTO speaking_events (event_name, event_date, location, venue, topic, event_type, registration_url, description, is_featured) VALUES
  ('MBA Annual Conference 2024', '2024-10-15', 'San Diego, CA', 'San Diego Convention Center', 'The Future of AI in Mortgage Marketing', 'keynote', 'https://mba.org/annual', 'Join Jarrett for a keynote presentation on how AI is reshaping mortgage marketing strategies.', true),
  ('Digital Mortgage Conference', '2024-09-20', 'Las Vegas, NV', 'Aria Resort & Casino', 'Building Compliant AI Systems', 'panel', 'https://digitalmortgage.com', 'Panel discussion on implementing AI while maintaining regulatory compliance.', false),
  ('Marketing Leadership Summit', '2024-11-05', 'Virtual', NULL, 'Leading High-Performance Marketing Teams', 'webinar', 'https://marketingleadership.com', 'Virtual workshop on building and leading innovative marketing teams in the digital age.', false);