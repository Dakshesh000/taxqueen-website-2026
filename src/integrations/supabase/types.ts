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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      email_templates: {
        Row: {
          body_html: string
          body_text: string | null
          created_at: string
          id: string
          is_active: boolean
          subject: string
          template_key: string
          updated_at: string
        }
        Insert: {
          body_html: string
          body_text?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          subject: string
          template_key: string
          updated_at?: string
        }
        Update: {
          body_html?: string
          body_text?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          subject?: string
          template_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      notification_settings: {
        Row: {
          created_at: string
          destination: string
          id: string
          is_active: boolean
          notification_method: Database["public"]["Enums"]["notification_method"]
          trigger_type: Database["public"]["Enums"]["notification_trigger"]
        }
        Insert: {
          created_at?: string
          destination: string
          id?: string
          is_active?: boolean
          notification_method: Database["public"]["Enums"]["notification_method"]
          trigger_type: Database["public"]["Enums"]["notification_trigger"]
        }
        Update: {
          created_at?: string
          destination?: string
          id?: string
          is_active?: boolean
          notification_method?: Database["public"]["Enums"]["notification_method"]
          trigger_type?: Database["public"]["Enums"]["notification_trigger"]
        }
        Relationships: []
      }
      quiz_leads: {
        Row: {
          created_at: string
          email: string
          id: string
          is_qualified: boolean
          name: string
          phone: string | null
          qualification_reasons: Json | null
          qualification_score: number | null
          session_id: string
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_qualified?: boolean
          name: string
          phone?: string | null
          qualification_reasons?: Json | null
          qualification_score?: number | null
          session_id: string
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_qualified?: boolean
          name?: string
          phone?: string | null
          qualification_reasons?: Json | null
          qualification_score?: number | null
          session_id?: string
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          background_image: string | null
          created_at: string
          help_text: string | null
          id: string
          is_active: boolean
          main_title: string
          options: Json | null
          order_index: number
          question_type: Database["public"]["Enums"]["quiz_question_type"]
          subtitle: string | null
          updated_at: string
        }
        Insert: {
          background_image?: string | null
          created_at?: string
          help_text?: string | null
          id?: string
          is_active?: boolean
          main_title: string
          options?: Json | null
          order_index: number
          question_type: Database["public"]["Enums"]["quiz_question_type"]
          subtitle?: string | null
          updated_at?: string
        }
        Update: {
          background_image?: string | null
          created_at?: string
          help_text?: string | null
          id?: string
          is_active?: boolean
          main_title?: string
          options?: Json | null
          order_index?: number
          question_type?: Database["public"]["Enums"]["quiz_question_type"]
          subtitle?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_responses: {
        Row: {
          answer_value: Json
          created_at: string
          id: string
          lead_id: string | null
          question_id: string | null
          question_key: string
          session_id: string
        }
        Insert: {
          answer_value: Json
          created_at?: string
          id?: string
          lead_id?: string | null
          question_id?: string | null
          question_key: string
          session_id: string
        }
        Update: {
          answer_value?: Json
          created_at?: string
          id?: string
          lead_id?: string | null
          question_id?: string | null
          question_key?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_responses_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "quiz_leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_scoring_rules: {
        Row: {
          answer_pattern: Json
          created_at: string
          description: string | null
          id: string
          is_disqualifier: boolean
          is_qualifier: boolean
          question_id: string | null
          question_key: string
          score_value: number
        }
        Insert: {
          answer_pattern: Json
          created_at?: string
          description?: string | null
          id?: string
          is_disqualifier?: boolean
          is_qualifier?: boolean
          question_id?: string | null
          question_key: string
          score_value?: number
        }
        Update: {
          answer_pattern?: Json
          created_at?: string
          description?: string | null
          id?: string
          is_disqualifier?: boolean
          is_qualifier?: boolean
          question_id?: string | null
          question_key?: string
          score_value?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_scoring_rules_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
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
      lead_status:
        | "new"
        | "contacted"
        | "booked"
        | "converted"
        | "not_interested"
      notification_method: "email" | "webhook"
      notification_trigger: "new_lead" | "qualified_lead" | "high_value_lead"
      quiz_question_type:
        | "yes_no"
        | "text_input"
        | "multi_select"
        | "single_select"
        | "slider"
        | "contact"
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
      lead_status: [
        "new",
        "contacted",
        "booked",
        "converted",
        "not_interested",
      ],
      notification_method: ["email", "webhook"],
      notification_trigger: ["new_lead", "qualified_lead", "high_value_lead"],
      quiz_question_type: [
        "yes_no",
        "text_input",
        "multi_select",
        "single_select",
        "slider",
        "contact",
      ],
    },
  },
} as const
