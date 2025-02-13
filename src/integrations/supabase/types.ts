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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
