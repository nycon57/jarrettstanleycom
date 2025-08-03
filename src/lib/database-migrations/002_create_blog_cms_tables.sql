-- Create categories table for blog posts and resources
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#6366f1', -- Hex color for category badges
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table for blog content
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown content
  featured_image_url TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  author_name VARCHAR(100) DEFAULT 'Jarrett Stanley',
  author_image_url TEXT,
  read_time_minutes INTEGER DEFAULT 5,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Search optimization
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', title), 'A') ||
    setweight(to_tsvector('english', excerpt), 'B') ||
    setweight(to_tsvector('english', content), 'C')
  ) STORED
);

-- Create junction table for post categories (many-to-many)
CREATE TABLE IF NOT EXISTS post_categories (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Create post_views table for analytics
CREATE TABLE IF NOT EXISTS post_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table for downloadable content
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  resource_type VARCHAR(50) NOT NULL CHECK (resource_type IN ('whitepaper', 'ebook', 'template', 'guide', 'checklist', 'video', 'podcast')),
  file_url TEXT NOT NULL,
  file_size_mb DECIMAL(5,2),
  thumbnail_url TEXT,
  preview_url TEXT, -- For previewing content before download
  requires_email BOOLEAN DEFAULT true,
  download_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create junction table for resource categories
CREATE TABLE IF NOT EXISTS resource_categories (
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (resource_id, category_id)
);

-- Create resource_downloads table for tracking
CREATE TABLE IF NOT EXISTS resource_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company VARCHAR(255),
  ip_address INET,
  user_agent TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_posts_published ON posts(is_published, published_at DESC);
CREATE INDEX idx_posts_featured ON posts(is_featured, published_at DESC);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_search ON posts USING GIN(search_vector);
CREATE INDEX idx_post_views_post_id ON post_views(post_id);
CREATE INDEX idx_post_views_viewed_at ON post_views(viewed_at);

CREATE INDEX idx_resources_published ON resources(is_published, created_at DESC);
CREATE INDEX idx_resources_featured ON resources(is_featured, created_at DESC);
CREATE INDEX idx_resources_type ON resources(resource_type);
CREATE INDEX idx_resources_slug ON resources(slug);
CREATE INDEX idx_resource_downloads_resource_id ON resource_downloads(resource_id);
CREATE INDEX idx_resource_downloads_email ON resource_downloads(email);

CREATE INDEX idx_categories_slug ON categories(slug);

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_downloads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Allow public read access to categories" 
  ON categories FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to published posts" 
  ON posts FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Allow public read access to post_categories" 
  ON post_categories FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to published resources" 
  ON resources FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Allow public read access to resource_categories" 
  ON resource_categories FOR SELECT 
  USING (true);

-- Allow public insert for post views and resource downloads
CREATE POLICY "Allow public insert to post_views" 
  ON post_views FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public insert to resource_downloads" 
  ON resource_downloads FOR INSERT 
  WITH CHECK (true);

-- Insert default categories
INSERT INTO categories (name, slug, description, color) VALUES
  ('AI & Innovation', 'ai-innovation', 'Cutting-edge insights on artificial intelligence and emerging technologies in the mortgage industry', '#8b5cf6'),
  ('Marketing Strategy', 'marketing-strategy', 'Strategic approaches to mortgage marketing and customer acquisition', '#06b6d4'),
  ('Industry Trends', 'industry-trends', 'Analysis of current trends and future predictions in mortgage banking', '#10b981'),
  ('Leadership', 'leadership', 'Thoughts on leading teams and driving organizational change', '#f59e0b')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog posts
INSERT INTO posts (title, slug, excerpt, content, featured_image_url, read_time_minutes, is_featured, is_published) VALUES
  (
    'The Future of AI in Mortgage Marketing: 5 Trends to Watch in 2024',
    'future-ai-mortgage-marketing-2024',
    'Artificial intelligence is reshaping how mortgage companies attract, engage, and convert customers. Here are the key trends that will define the industry this year.',
    '# The Future of AI in Mortgage Marketing: 5 Trends to Watch in 2024

The mortgage industry is experiencing a technological revolution, and artificial intelligence is at the forefront of this transformation. As Chief Marketing Officer at Nationwide Mortgage Bankers and creator of TrueTone AI, I''ve witnessed firsthand how AI is changing the game for mortgage marketers.

## 1. Hyper-Personalized Customer Journeys

Gone are the days of one-size-fits-all marketing campaigns. AI-powered platforms can now analyze customer behavior, preferences, and financial profiles to create highly personalized experiences at scale.

**Key Benefits:**
- Increased conversion rates by up to 40%
- Improved customer satisfaction scores
- More efficient lead nurturing processes

## 2. Predictive Analytics for Lead Scoring

Machine learning algorithms can now predict which leads are most likely to convert, allowing mortgage companies to focus their resources on the highest-value prospects.

## 3. Automated Content Generation

AI tools are becoming sophisticated enough to generate compelling marketing content, from email campaigns to social media posts, while maintaining brand voice and compliance requirements.

## 4. Voice and Conversational AI

Chatbots and voice assistants are becoming more sophisticated, handling complex customer inquiries and guiding prospects through the initial stages of the mortgage process.

## 5. Real-Time Market Intelligence

AI systems can analyze market conditions, competitor pricing, and customer sentiment in real-time, enabling more agile marketing strategies.

## Conclusion

The integration of AI in mortgage marketing isn''t just a trend—it''s becoming a necessity for companies that want to remain competitive. Those who embrace these technologies now will have a significant advantage in the years to come.',
    '/assets/images/TTAI-Stock-Image-1.jpg',
    8,
    true,
    true
  ),
  (
    'Building Compliant AI Systems: A Mortgage Marketer''s Guide',
    'building-compliant-ai-systems-mortgage',
    'Implementing AI in mortgage marketing requires careful attention to regulatory compliance. Learn how to build systems that are both powerful and compliant.',
    '# Building Compliant AI Systems: A Mortgage Marketer''s Guide

Compliance is paramount in the mortgage industry, and AI implementation must be approached with careful consideration of regulatory requirements.

## Understanding the Regulatory Landscape

The mortgage industry operates under strict regulations including TRID, RESPA, and fair lending laws. AI systems must be designed to support, not compromise, compliance efforts.

## Key Compliance Considerations

### Data Privacy and Security
- Implement robust encryption for customer data
- Ensure GDPR and CCPA compliance for data collection
- Regular security audits and vulnerability assessments

### Algorithmic Fairness
- Regular testing for bias in AI decision-making
- Documentation of AI model decisions
- Transparency in automated processes

### Audit Trails
- Comprehensive logging of AI decisions
- Version control for AI models
- Regular compliance reviews

## Best Practices for Implementation

1. **Start with a compliance-first mindset**
2. **Involve legal and compliance teams early**
3. **Implement gradual rollouts with monitoring**
4. **Regular training for staff on AI compliance**

By following these guidelines, mortgage companies can harness the power of AI while maintaining the highest standards of regulatory compliance.',
    '/assets/images/TTAI-Stock-Image-2.jpg',
    6,
    false,
    true
  ),
  (
    'How TrueTone AI Transformed Our Lead Generation Strategy',
    'truetone-ai-lead-generation-transformation',
    'A case study on how we used our own AI platform to revolutionize lead generation at Nationwide Mortgage Bankers, resulting in a 300% increase in qualified leads.',
    '# How TrueTone AI Transformed Our Lead Generation Strategy

When we launched TrueTone AI, we knew we had something special. But like any good marketer, I wanted to put it to the test in our own organization first.

## The Challenge

Nationwide Mortgage Bankers was facing the same challenges as many in our industry:
- Declining conversion rates from traditional marketing channels
- Increased competition for quality leads
- Rising customer acquisition costs
- Difficulty personalizing at scale

## The Solution: TrueTone AI Implementation

We implemented our own platform across three key areas:

### 1. Intelligent Lead Scoring
Using machine learning algorithms trained on our historical data, we could identify high-value prospects 3x faster than manual processes.

### 2. Automated Nurture Campaigns
AI-powered email sequences that adapted based on prospect behavior and engagement levels.

### 3. Dynamic Content Optimization
Real-time optimization of landing pages and marketing materials based on visitor profiles and behavior.

## The Results

After six months of implementation:
- **300% increase** in qualified leads
- **45% reduction** in cost per acquisition
- **60% improvement** in lead-to-customer conversion rates
- **25% faster** sales cycle

## Key Learnings

1. **Start small and scale**: We began with one campaign before expanding
2. **Data quality matters**: Clean, organized data is crucial for AI success
3. **Human oversight is essential**: AI enhances human decision-making, doesn''t replace it
4. **Continuous optimization**: Regular model updates improved performance over time

## What''s Next?

We''re now expanding TrueTone AI''s capabilities to include predictive customer lifetime value modeling and advanced market intelligence features.

The future of mortgage marketing is here, and it''s powered by AI.',
    '/assets/images/TTAI-Stock-Image-3.jpg',
    7,
    true,
    true
  );

-- Link posts to categories
INSERT INTO post_categories (post_id, category_id) 
SELECT p.id, c.id 
FROM posts p, categories c 
WHERE (p.slug = 'future-ai-mortgage-marketing-2024' AND c.slug IN ('ai-innovation', 'industry-trends'))
   OR (p.slug = 'building-compliant-ai-systems-mortgage' AND c.slug IN ('ai-innovation', 'marketing-strategy'))
   OR (p.slug = 'truetone-ai-lead-generation-transformation' AND c.slug IN ('ai-innovation', 'marketing-strategy', 'leadership'));

-- Insert sample resources
INSERT INTO resources (title, slug, description, resource_type, file_url, file_size_mb, thumbnail_url, is_featured) VALUES
  (
    'AI Implementation Checklist for Mortgage Companies', 
    'ai-implementation-checklist-mortgage',
    'A comprehensive 25-point checklist to guide your AI implementation journey in mortgage marketing, covering everything from data preparation to compliance considerations.',
    'checklist',
    '/resources/ai-implementation-checklist.pdf',
    2.3,
    '/assets/images/TTAI-Stock-Image-4.jpg',
    true
  ),
  (
    'The Complete Guide to Mortgage Marketing Automation',
    'mortgage-marketing-automation-guide',
    'Learn how to automate your mortgage marketing processes while maintaining personalization and compliance. Includes templates, workflows, and implementation strategies.',
    'guide',
    '/resources/mortgage-marketing-automation-guide.pdf',
    8.7,
    '/assets/images/TTAI-Stock-Image-5.jpg',
    true
  ),
  (
    'TrueTone AI Platform Overview',
    'truetone-ai-platform-overview',
    'Discover how TrueTone AI can transform your mortgage marketing efforts. This whitepaper includes case studies, ROI calculations, and implementation timelines.',
    'whitepaper',
    '/resources/truetone-ai-whitepaper.pdf',
    5.2,
    '/assets/images/TTAI-Stock-Image-6.jpg',
    false
  );

-- Link resources to categories
INSERT INTO resource_categories (resource_id, category_id)
SELECT r.id, c.id 
FROM resources r, categories c 
WHERE (r.slug = 'ai-implementation-checklist-mortgage' AND c.slug IN ('ai-innovation', 'marketing-strategy'))
   OR (r.slug = 'mortgage-marketing-automation-guide' AND c.slug = 'marketing-strategy')
   OR (r.slug = 'truetone-ai-platform-overview' AND c.slug IN ('ai-innovation', 'marketing-strategy'));

-- Create function to update post view counts
CREATE OR REPLACE FUNCTION get_post_view_count(post_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM post_views WHERE post_id = post_uuid);
END;
$$ LANGUAGE plpgsql;

-- Create function to increment resource download count
CREATE OR REPLACE FUNCTION increment_resource_download_count(resource_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE resources 
  SET download_count = download_count + 1 
  WHERE id = resource_uuid;
END;
$$ LANGUAGE plpgsql;