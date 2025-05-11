export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          subscription_tier: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          subscription_tier?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          subscription_tier?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      counseling_type: "josaa" | "csab" | "mpdter" | "uptac"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      counseling_type: ["josaa", "csab", "mpdter", "uptac"],
    },
  },
} as const
