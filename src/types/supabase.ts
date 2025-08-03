export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      contacts: {
        Row: {
          audience_size: number | null
          budget_range: string | null
          company: string | null
          company_size: string | null
          contacted_at: string | null
          created_at: string | null
          current_challenges: string | null
          email: string
          event_date: string | null
          event_location: string | null
          event_name: string | null
          first_name: string
          id: string
          ip_address: unknown | null
          last_name: string
          message: string
          notes: string | null
          phone: string | null
          preferred_contact_method: string | null
          project_description: string | null
          referrer: string | null
          role: string | null
          source: string | null
          status: string | null
          timeline: string | null
          type: string
          updated_at: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          audience_size?: number | null
          budget_range?: string | null
          company?: string | null
          company_size?: string | null
          contacted_at?: string | null
          created_at?: string | null
          current_challenges?: string | null
          email: string
          event_date?: string | null
          event_location?: string | null
          event_name?: string | null
          first_name: string
          id?: string
          ip_address?: unknown | null
          last_name: string
          message: string
          notes?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          project_description?: string | null
          referrer?: string | null
          role?: string | null
          source?: string | null
          status?: string | null
          timeline?: string | null
          type: string
          updated_at?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          audience_size?: number | null
          budget_range?: string | null
          company?: string | null
          company_size?: string | null
          contacted_at?: string | null
          created_at?: string | null
          current_challenges?: string | null
          email?: string
          event_date?: string | null
          event_location?: string | null
          event_name?: string | null
          first_name?: string
          id?: string
          ip_address?: unknown | null
          last_name?: string
          message?: string
          notes?: string | null
          phone?: string | null
          preferred_contact_method?: string | null
          project_description?: string | null
          referrer?: string | null
          role?: string | null
          source?: string | null
          status?: string | null
          timeline?: string | null
          type?: string
          updated_at?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      post_views: {
        Row: {
          city: string | null
          country: string | null
          id: string
          ip_address: unknown | null
          post_id: string | null
          referrer: string | null
          user_agent: string | null
          viewed_at: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          id?: string
          ip_address?: unknown | null
          post_id?: string | null
          referrer?: string | null
          user_agent?: string | null
          viewed_at?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          id?: string
          ip_address?: unknown | null
          post_id?: string | null
          referrer?: string | null
          user_agent?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_views_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_views_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts_with_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          categories: string[] | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          og_image: string | null
          published_at: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          categories?: string[] | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          og_image?: string | null
          published_at?: string | null
          slug: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          categories?: string[] | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_title?: string | null
          og_image?: string | null
          published_at?: string | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      resource_downloads: {
        Row: {
          company: string | null
          downloaded_at: string | null
          email: string
          first_name: string | null
          id: string
          ip_address: unknown | null
          last_name: string | null
          referrer: string | null
          resource_id: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          company?: string | null
          downloaded_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          ip_address?: unknown | null
          last_name?: string | null
          referrer?: string | null
          resource_id?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          company?: string | null
          downloaded_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          ip_address?: unknown | null
          last_name?: string | null
          referrer?: string | null
          resource_id?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resource_downloads_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          download_count: number | null
          file_size: number | null
          file_url: string
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          meta_description: string | null
          meta_title: string | null
          requires_email: boolean | null
          slug: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          type: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_size?: number | null
          file_url: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          requires_email?: boolean | null
          slug: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          type: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_size?: number | null
          file_url?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          requires_email?: boolean | null
          slug?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      speaking_events: {
        Row: {
          audience_size: number | null
          audience_type: string | null
          created_at: string | null
          description: string | null
          event_date: string
          event_type: string | null
          event_url: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          is_virtual: boolean | null
          is_visible: boolean | null
          location: string | null
          name: string
          organization: string
          slides_url: string | null
          status: string | null
          testimonial_id: string | null
          topics: string[] | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          audience_size?: number | null
          audience_type?: string | null
          created_at?: string | null
          description?: string | null
          event_date: string
          event_type?: string | null
          event_url?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_virtual?: boolean | null
          is_visible?: boolean | null
          location?: string | null
          name: string
          organization: string
          slides_url?: string | null
          status?: string | null
          testimonial_id?: string | null
          topics?: string[] | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          audience_size?: number | null
          audience_type?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string
          event_type?: string | null
          event_url?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_virtual?: boolean | null
          is_visible?: boolean | null
          location?: string | null
          name?: string
          organization?: string
          slides_url?: string | null
          status?: string | null
          testimonial_id?: string | null
          topics?: string[] | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "speaking_events_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "featured_testimonials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speaking_events_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          company: string | null
          confirmed_at: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          interests: string[] | null
          ip_address: unknown | null
          last_email_clicked_at: string | null
          last_email_opened_at: string | null
          last_email_sent_at: string | null
          last_name: string | null
          referrer: string | null
          role: string | null
          source: string | null
          status: string | null
          total_emails_clicked: number | null
          total_emails_opened: number | null
          total_emails_sent: number | null
          unsubscribed_at: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          company?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          interests?: string[] | null
          ip_address?: unknown | null
          last_email_clicked_at?: string | null
          last_email_opened_at?: string | null
          last_email_sent_at?: string | null
          last_name?: string | null
          referrer?: string | null
          role?: string | null
          source?: string | null
          status?: string | null
          total_emails_clicked?: number | null
          total_emails_opened?: number | null
          total_emails_sent?: number | null
          unsubscribed_at?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          company?: string | null
          confirmed_at?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          interests?: string[] | null
          ip_address?: unknown | null
          last_email_clicked_at?: string | null
          last_email_opened_at?: string | null
          last_email_sent_at?: string | null
          last_name?: string | null
          referrer?: string | null
          role?: string | null
          source?: string | null
          status?: string | null
          total_emails_clicked?: number | null
          total_emails_opened?: number | null
          total_emails_sent?: number | null
          unsubscribed_at?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_company: string | null
          author_image_url: string | null
          author_name: string
          author_role: string | null
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          quote: string
          rating: number | null
          service_type: string | null
          updated_at: string | null
        }
        Insert: {
          author_company?: string | null
          author_image_url?: string | null
          author_name: string
          author_role?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          quote: string
          rating?: number | null
          service_type?: string | null
          updated_at?: string | null
        }
        Update: {
          author_company?: string | null
          author_image_url?: string | null
          author_name?: string
          author_role?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          quote?: string
          rating?: number | null
          service_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          ip_address: unknown | null
          marketing_consent: boolean | null
          name: string | null
          referrer: string | null
          updated_at: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          ip_address?: unknown | null
          marketing_consent?: boolean | null
          name?: string | null
          referrer?: string | null
          updated_at?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          ip_address?: unknown | null
          marketing_consent?: boolean | null
          name?: string | null
          referrer?: string | null
          updated_at?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      featured_testimonials: {
        Row: {
          author_company: string | null
          author_image_url: string | null
          author_name: string | null
          author_role: string | null
          created_at: string | null
          display_order: number | null
          id: string | null
          is_active: boolean | null
          is_featured: boolean | null
          quote: string | null
          rating: number | null
          service_type: string | null
          updated_at: string | null
        }
        Insert: {
          author_company?: string | null
          author_image_url?: string | null
          author_name?: string | null
          author_role?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          quote?: string | null
          rating?: number | null
          service_type?: string | null
          updated_at?: string | null
        }
        Update: {
          author_company?: string | null
          author_image_url?: string | null
          author_name?: string | null
          author_role?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          quote?: string | null
          rating?: number | null
          service_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      past_speaking_events: {
        Row: {
          audience_size: number | null
          audience_type: string | null
          created_at: string | null
          description: string | null
          event_date: string | null
          event_type: string | null
          event_url: string | null
          id: string | null
          image_url: string | null
          is_featured: boolean | null
          is_virtual: boolean | null
          is_visible: boolean | null
          location: string | null
          name: string | null
          organization: string | null
          slides_url: string | null
          status: string | null
          testimonial_id: string | null
          topics: string[] | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          audience_size?: number | null
          audience_type?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_type?: string | null
          event_url?: string | null
          id?: string | null
          image_url?: string | null
          is_featured?: boolean | null
          is_virtual?: boolean | null
          is_visible?: boolean | null
          location?: string | null
          name?: string | null
          organization?: string | null
          slides_url?: string | null
          status?: string | null
          testimonial_id?: string | null
          topics?: string[] | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          audience_size?: number | null
          audience_type?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_type?: string | null
          event_url?: string | null
          id?: string | null
          image_url?: string | null
          is_featured?: boolean | null
          is_virtual?: boolean | null
          is_visible?: boolean | null
          location?: string | null
          name?: string | null
          organization?: string | null
          slides_url?: string | null
          status?: string | null
          testimonial_id?: string | null
          topics?: string[] | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "speaking_events_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "featured_testimonials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speaking_events_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials"
            referencedColumns: ["id"]
          },
        ]
      }
      posts_with_stats: {
        Row: {
          categories: string[] | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string | null
          last_viewed_at: string | null
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          og_image: string | null
          published_at: string | null
          slug: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          view_count: number | null
        }
        Relationships: []
      }
      upcoming_speaking_events: {
        Row: {
          audience_size: number | null
          audience_type: string | null
          created_at: string | null
          description: string | null
          event_date: string | null
          event_type: string | null
          event_url: string | null
          id: string | null
          image_url: string | null
          is_featured: boolean | null
          is_virtual: boolean | null
          is_visible: boolean | null
          location: string | null
          name: string | null
          organization: string | null
          slides_url: string | null
          status: string | null
          testimonial_id: string | null
          topics: string[] | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          audience_size?: number | null
          audience_type?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_type?: string | null
          event_url?: string | null
          id?: string | null
          image_url?: string | null
          is_featured?: boolean | null
          is_virtual?: boolean | null
          is_visible?: boolean | null
          location?: string | null
          name?: string | null
          organization?: string | null
          slides_url?: string | null
          status?: string | null
          testimonial_id?: string | null
          topics?: string[] | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          audience_size?: number | null
          audience_type?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string | null
          event_type?: string | null
          event_url?: string | null
          id?: string | null
          image_url?: string | null
          is_featured?: boolean | null
          is_virtual?: boolean | null
          is_visible?: boolean | null
          location?: string | null
          name?: string | null
          organization?: string | null
          slides_url?: string | null
          status?: string | null
          testimonial_id?: string | null
          topics?: string[] | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "speaking_events_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "featured_testimonials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "speaking_events_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_post_view_count: {
        Args: { post_id_param: string }
        Returns: number
      }
      increment_post_view: {
        Args: {
          post_id_param: string
          ip_address_param?: unknown
          user_agent_param?: string
          referrer_param?: string
        }
        Returns: undefined
      }
      search_posts: {
        Args: { search_query: string }
        Returns: {
          categories: string[] | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_keywords: string[] | null
          meta_title: string | null
          og_image: string | null
          published_at: string | null
          slug: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const