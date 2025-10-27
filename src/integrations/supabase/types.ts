export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      chat_conversations: {
        Row: {
          advanced_rank: number | null
          board_percentage: number | null
          budget_range: string | null
          career_goal: string | null
          category: string | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          jee_rank: number | null
          location_preference: string | null
          preferred_branch: string | null
          user_id: string | null
        }
        Insert: {
          advanced_rank?: number | null
          board_percentage?: number | null
          budget_range?: string | null
          career_goal?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          jee_rank?: number | null
          location_preference?: string | null
          preferred_branch?: string | null
          user_id?: string | null
        }
        Update: {
          advanced_rank?: number | null
          board_percentage?: number | null
          budget_range?: string | null
          career_goal?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          jee_rank?: number | null
          location_preference?: string | null
          preferred_branch?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_bot: boolean | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_bot?: boolean | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_bot?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      college_cutoffs: {
        Row: {
          branch: string
          category: string
          college_id: string | null
          created_at: string | null
          cutoff_rank: number
          id: string
          is_premium: boolean | null
          round: number
          year: number
        }
        Insert: {
          branch: string
          category: string
          college_id?: string | null
          created_at?: string | null
          cutoff_rank: number
          id?: string
          is_premium?: boolean | null
          round: number
          year: number
        }
        Update: {
          branch?: string
          category?: string
          college_id?: string | null
          created_at?: string | null
          cutoff_rank?: number
          id?: string
          is_premium?: boolean | null
          round?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "college_cutoffs_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      college_recommendations: {
        Row: {
          analysis_request_id: string | null
          branch: string
          college_id: string | null
          created_at: string | null
          id: string
          probability: string
          round: number
        }
        Insert: {
          analysis_request_id?: string | null
          branch: string
          college_id?: string | null
          created_at?: string | null
          id?: string
          probability: string
          round: number
        }
        Update: {
          analysis_request_id?: string | null
          branch?: string
          college_id?: string | null
          created_at?: string | null
          id?: string
          probability?: string
          round?: number
        }
        Relationships: [
          {
            foreignKeyName: "college_recommendations_analysis_request_id_fkey"
            columns: ["analysis_request_id"]
            isOneToOne: false
            referencedRelation: "rank_analysis_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "college_recommendations_college_id_fkey"
            columns: ["college_id"]
            isOneToOne: false
            referencedRelation: "colleges"
            referencedColumns: ["id"]
          },
        ]
      }
      colleges: {
        Row: {
          campus_life: string | null
          created_at: string | null
          id: string
          location: string
          name: string
          placement_stats: string | null
          research_opportunities: string | null
          type: string
          website: string | null
        }
        Insert: {
          campus_life?: string | null
          created_at?: string | null
          id?: string
          location: string
          name: string
          placement_stats?: string | null
          research_opportunities?: string | null
          type: string
          website?: string | null
        }
        Update: {
          campus_life?: string | null
          created_at?: string | null
          id?: string
          location?: string
          name?: string
          placement_stats?: string | null
          research_opportunities?: string | null
          type?: string
          website?: string | null
        }
        Relationships: []
      }
      course_completions: {
        Row: {
          certificate_id: string
          certificate_sent: boolean | null
          completed_at: string
          completion_days: number | null
          course_id: string
          created_at: string
          id: string
          medal_type: string | null
          user_id: string
        }
        Insert: {
          certificate_id: string
          certificate_sent?: boolean | null
          completed_at?: string
          completion_days?: number | null
          course_id: string
          created_at?: string
          id?: string
          medal_type?: string | null
          user_id: string
        }
        Update: {
          certificate_id?: string
          certificate_sent?: boolean | null
          completed_at?: string
          completion_days?: number | null
          course_id?: string
          created_at?: string
          id?: string
          medal_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      course_progress: {
        Row: {
          completed_at: string | null
          course_id: string
          created_at: string
          id: string
          is_completed: boolean | null
          module_id: string
          total_duration_seconds: number | null
          updated_at: string
          user_id: string
          watch_time_seconds: number | null
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          created_at?: string
          id?: string
          is_completed?: boolean | null
          module_id: string
          total_duration_seconds?: number | null
          updated_at?: string
          user_id: string
          watch_time_seconds?: number | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          created_at?: string
          id?: string
          is_completed?: boolean | null
          module_id?: string
          total_duration_seconds?: number | null
          updated_at?: string
          user_id?: string
          watch_time_seconds?: number | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string
          created_at: string | null
          cta_link: string | null
          cta_text: string
          description: string
          featured: boolean | null
          format: string[]
          icon: string
          id: string
          is_waitlist: boolean | null
          level: string
          original_price: number | null
          price: number
          rating: number | null
          students: number | null
          target_audience: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          cta_link?: string | null
          cta_text?: string
          description: string
          featured?: boolean | null
          format: string[]
          icon: string
          id?: string
          is_waitlist?: boolean | null
          level?: string
          original_price?: number | null
          price: number
          rating?: number | null
          students?: number | null
          target_audience: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          cta_link?: string | null
          cta_text?: string
          description?: string
          featured?: boolean | null
          format?: string[]
          icon?: string
          id?: string
          is_waitlist?: boolean | null
          level?: string
          original_price?: number | null
          price?: number
          rating?: number | null
          students?: number | null
          target_audience?: string
          title?: string
        }
        Relationships: []
      }
      group_discussions: {
        Row: {
          created_at: string | null
          group_id: string
          id: string
          message: string
          parent_message_id: string | null
          student_id: string
          topic_id: string | null
        }
        Insert: {
          created_at?: string | null
          group_id: string
          id?: string
          message: string
          parent_message_id?: string | null
          student_id: string
          topic_id?: string | null
        }
        Update: {
          created_at?: string | null
          group_id?: string
          id?: string
          message?: string
          parent_message_id?: string | null
          student_id?: string
          topic_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_discussions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_discussions_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "group_discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_discussions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_discussions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "roadmap_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      group_invites: {
        Row: {
          created_at: string | null
          created_by: string
          current_uses: number | null
          expires_at: string | null
          group_id: string
          id: string
          invite_code: string
          max_uses: number | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          current_uses?: number | null
          expires_at?: string | null
          group_id: string
          id?: string
          invite_code: string
          max_uses?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          current_uses?: number | null
          expires_at?: string | null
          group_id?: string
          id?: string
          invite_code?: string
          max_uses?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "group_invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_invites_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string | null
          student_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string | null
          student_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      group_resources: {
        Row: {
          created_at: string | null
          created_by: string | null
          group_id: string
          id: string
          language: string | null
          resource_type: string
          title: string
          topic_id: string | null
          url: string
          view_count: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          group_id: string
          id?: string
          language?: string | null
          resource_type: string
          title: string
          topic_id?: string | null
          url: string
          view_count?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          group_id?: string
          id?: string
          language?: string | null
          resource_type?: string
          title?: string
          topic_id?: string | null
          url?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "group_resources_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_resources_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_resources_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "roadmap_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      group_targets: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          group_id: string
          id: string
          is_completed: boolean | null
          target_date: string
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          group_id: string
          id?: string
          is_completed?: boolean | null
          target_date: string
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          group_id?: string
          id?: string
          is_completed?: boolean | null
          target_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_targets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_targets_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          is_veg: boolean | null
          name: string
          prep_time_minutes: number | null
          price: number
          restaurant_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_veg?: boolean | null
          name: string
          prep_time_minutes?: number | null
          price: number
          restaurant_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          is_veg?: boolean | null
          name?: string
          prep_time_minutes?: number | null
          price?: number
          restaurant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: string
          menu_item_id: string | null
          order_id: string | null
          price: number
          quantity: number
          special_instructions: string | null
        }
        Insert: {
          id?: string
          menu_item_id?: string | null
          order_id?: string | null
          price: number
          quantity?: number
          special_instructions?: string | null
        }
        Update: {
          id?: string
          menu_item_id?: string | null
          order_id?: string | null
          price?: number
          quantity?: number
          special_instructions?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          customer_location: Json | null
          id: string
          payment_status: string | null
          pickup_time: string | null
          restaurant_id: string | null
          special_instructions: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          customer_location?: Json | null
          id?: string
          payment_status?: string | null
          pickup_time?: string | null
          restaurant_id?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          customer_location?: Json | null
          id?: string
          payment_status?: string | null
          pickup_time?: string | null
          restaurant_id?: string | null
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          phone: string | null
          subscription_tier: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          phone?: string | null
          subscription_tier?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          subscription_tier?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: []
      }
      rank_analysis_requests: {
        Row: {
          category: string
          counseling_type: Database["public"]["Enums"]["counseling_type"]
          created_at: string | null
          gender: string
          home_state: string
          id: string
          jee_advanced_rank: number | null
          jee_mains_rank: number | null
          user_id: string | null
        }
        Insert: {
          category: string
          counseling_type: Database["public"]["Enums"]["counseling_type"]
          created_at?: string | null
          gender: string
          home_state: string
          id?: string
          jee_advanced_rank?: number | null
          jee_mains_rank?: number | null
          user_id?: string | null
        }
        Update: {
          category?: string
          counseling_type?: Database["public"]["Enums"]["counseling_type"]
          created_at?: string | null
          gender?: string
          home_state?: string
          id?: string
          jee_advanced_rank?: number | null
          jee_mains_rank?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      restaurants: {
        Row: {
          address: string
          created_at: string | null
          cuisine_type: string | null
          description: string | null
          id: string
          image_url: string | null
          is_open: boolean | null
          is_veg: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          opening_hours: Json | null
          phone: string | null
          rating: number | null
          total_reviews: number | null
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          cuisine_type?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_open?: boolean | null
          is_veg?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          opening_hours?: Json | null
          phone?: string | null
          rating?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          cuisine_type?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_open?: boolean | null
          is_veg?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          opening_hours?: Json | null
          phone?: string | null
          rating?: number | null
          total_reviews?: number | null
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          customer_id: string | null
          id: string
          order_id: string | null
          rating: number | null
          restaurant_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          order_id?: string | null
          rating?: number | null
          restaurant_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          order_id?: string | null
          rating?: number | null
          restaurant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmap_topics: {
        Row: {
          category: Database["public"]["Enums"]["roadmap_category"]
          created_at: string | null
          description: string | null
          estimated_hours: number | null
          id: string
          parent_topic_id: string | null
          sequence_order: number
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["roadmap_category"]
          created_at?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string
          parent_topic_id?: string | null
          sequence_order: number
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["roadmap_category"]
          created_at?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string
          parent_topic_id?: string | null
          sequence_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "roadmap_topics_parent_topic_id_fkey"
            columns: ["parent_topic_id"]
            isOneToOne: false
            referencedRelation: "roadmap_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmaps: {
        Row: {
          created_at: string | null
          description: string
          id: string
          title: string
          total_milestones: number | null
          type: Database["public"]["Enums"]["roadmap_type"]
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          title: string
          total_milestones?: number | null
          type: Database["public"]["Enums"]["roadmap_type"]
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          title?: string
          total_milestones?: number | null
          type?: Database["public"]["Enums"]["roadmap_type"]
        }
        Relationships: []
      }
      student_progress: {
        Row: {
          id: string
          milestones_completed: number | null
          progress_percentage: number | null
          roadmap_type: Database["public"]["Enums"]["roadmap_type"]
          student_id: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          milestones_completed?: number | null
          progress_percentage?: number | null
          roadmap_type: Database["public"]["Enums"]["roadmap_type"]
          student_id: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          milestones_completed?: number | null
          progress_percentage?: number | null
          roadmap_type?: Database["public"]["Enums"]["roadmap_type"]
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_topic_progress: {
        Row: {
          completed_at: string | null
          group_id: string
          id: string
          is_completed: boolean | null
          notes: string | null
          student_id: string
          topic_id: string
        }
        Insert: {
          completed_at?: string | null
          group_id: string
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          student_id: string
          topic_id: string
        }
        Update: {
          completed_at?: string | null
          group_id?: string
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          student_id?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_topic_progress_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_topic_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_topic_progress_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "roadmap_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          campus: string
          created_at: string | null
          grade_semester: string
          id: string
          interests: string[] | null
          name: string
          selected_roadmap: Database["public"]["Enums"]["roadmap_type"]
          total_study_hours: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          campus: string
          created_at?: string | null
          grade_semester: string
          id?: string
          interests?: string[] | null
          name: string
          selected_roadmap: Database["public"]["Enums"]["roadmap_type"]
          total_study_hours?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          campus?: string
          created_at?: string | null
          grade_semester?: string
          id?: string
          interests?: string[] | null
          name?: string
          selected_roadmap?: Database["public"]["Enums"]["roadmap_type"]
          total_study_hours?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      study_groups: {
        Row: {
          campus: string
          created_at: string | null
          creator_id: string
          id: string
          name: string
          privacy: Database["public"]["Enums"]["group_privacy"] | null
          roadmap_category:
            | Database["public"]["Enums"]["roadmap_category"]
            | null
          study_target: string
          total_study_hours: number | null
          updated_at: string | null
        }
        Insert: {
          campus: string
          created_at?: string | null
          creator_id: string
          id?: string
          name: string
          privacy?: Database["public"]["Enums"]["group_privacy"] | null
          roadmap_category?:
            | Database["public"]["Enums"]["roadmap_category"]
            | null
          study_target: string
          total_study_hours?: number | null
          updated_at?: string | null
        }
        Update: {
          campus?: string
          created_at?: string | null
          creator_id?: string
          id?: string
          name?: string
          privacy?: Database["public"]["Enums"]["group_privacy"] | null
          roadmap_category?:
            | Database["public"]["Enums"]["roadmap_category"]
            | null
          study_target?: string
          total_study_hours?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_groups_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      study_resources: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          plan_type: string
          resource_type: string
          roadmap_type: string | null
          title: string
          url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          plan_type?: string
          resource_type: string
          roadmap_type?: string | null
          title: string
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          plan_type?: string
          resource_type?: string
          roadmap_type?: string | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          end_time: string | null
          group_id: string | null
          id: string
          is_active: boolean | null
          start_time: string
          student_id: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          group_id?: string | null
          id?: string
          is_active?: boolean | null
          start_time?: string
          student_id: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          end_time?: string | null
          group_id?: string | null
          id?: string
          is_active?: boolean | null
          start_time?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_leaderboard: {
        Row: {
          badge: string | null
          campus: string
          created_at: string | null
          group_id: string | null
          id: string
          rank: number
          student_id: string | null
          study_hours: number
          week_start: string
        }
        Insert: {
          badge?: string | null
          campus: string
          created_at?: string | null
          group_id?: string | null
          id?: string
          rank: number
          student_id?: string | null
          study_hours: number
          week_start: string
        }
        Update: {
          badge?: string | null
          campus?: string
          created_at?: string | null
          group_id?: string | null
          id?: string
          rank?: number
          student_id?: string | null
          study_hours?: number
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_leaderboard_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weekly_leaderboard_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      counseling_type: "josaa" | "csab" | "mpdter" | "uptac"
      group_privacy: "public" | "private"
      order_status:
        | "pending"
        | "confirmed"
        | "preparing"
        | "ready"
        | "picked_up"
        | "completed"
        | "cancelled"
      roadmap_category:
        | "web_development"
        | "data_science_ai"
        | "app_development"
        | "dsa"
      roadmap_type:
        | "ace_semester_exams"
        | "master_python"
        | "crack_placements"
        | "web_development"
        | "data_science"
        | "competitive_programming"
      user_type: "traveler" | "vendor"
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
    Enums: {
      counseling_type: ["josaa", "csab", "mpdter", "uptac"],
      group_privacy: ["public", "private"],
      order_status: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "picked_up",
        "completed",
        "cancelled",
      ],
      roadmap_category: [
        "web_development",
        "data_science_ai",
        "app_development",
        "dsa",
      ],
      roadmap_type: [
        "ace_semester_exams",
        "master_python",
        "crack_placements",
        "web_development",
        "data_science",
        "competitive_programming",
      ],
      user_type: ["traveler", "vendor"],
    },
  },
} as const
