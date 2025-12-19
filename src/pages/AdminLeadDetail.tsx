import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, User, Mail, Phone, Calendar, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

interface QuizLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  is_qualified: boolean;
  qualification_score: number | null;
  qualification_reasons: unknown;
  status: string;
  created_at: string;
  session_id: string;
}

interface QuizResponse {
  id: string;
  question_key: string;
  answer_value: unknown;
  created_at: string;
}

const AdminLeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAdmin, loading, isDemoMode } = useAdmin();
  const navigate = useNavigate();
  const [lead, setLead] = useState<QuizLead | null>(null);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Redirect if not authenticated or not admin (unless demo mode)
  useEffect(() => {
    if (!loading && !isDemoMode && (!user || !isAdmin)) {
      navigate("/admin-login");
    }
  }, [user, isAdmin, loading, isDemoMode, navigate]);

  // Fetch lead and responses
  useEffect(() => {
    if ((isDemoMode || (user && isAdmin)) && id) {
      fetchLeadData();
    }
  }, [user, isAdmin, isDemoMode, id]);

  const fetchLeadData = async () => {
    try {
      // Fetch lead
      const { data: leadData, error: leadError } = await supabase
        .from("quiz_leads")
        .select("*")
        .eq("id", id)
        .single();

      if (leadError) {
        console.error("Error fetching lead:", leadError);
        navigate("/admin");
        return;
      }

      setLead(leadData);

      // Fetch responses using session_id
      const { data: responsesData, error: responsesError } = await supabase
        .from("quiz_responses")
        .select("*")
        .eq("session_id", leadData.session_id)
        .order("created_at", { ascending: true });

      if (responsesError) {
        console.error("Error fetching responses:", responsesError);
      } else {
        setResponses(responsesData || []);
      }
    } catch (err) {
      console.error("Error fetching lead data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const formatAnswerValue = (value: unknown): string => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  const formatQuestionKey = (key: string): string => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isDemoMode && (!user || !isAdmin) || !lead) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            asChild
          >
            <Link to="/admin">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <h1 className="text-xl font-bold uppercase tracking-wide">Lead Details</h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lead Info Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{lead.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                  {lead.email}
                </a>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${lead.phone}`} className="text-primary hover:underline">
                    {lead.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(lead.created_at), "MMM d, yyyy 'at' h:mm a")}</span>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Qualified</span>
                  {lead.is_qualified ? (
                    <Badge className="bg-primary gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Yes
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1">
                      <XCircle className="h-3 w-3" />
                      No
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Score</span>
                  <span className="font-bold text-lg">{lead.qualification_score ?? "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className="capitalize">
                    {lead.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Responses Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="uppercase tracking-wide">Quiz Responses</CardTitle>
              <CardDescription>
                All answers submitted during the quiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              {responses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No responses recorded for this lead.
                </div>
              ) : (
                <div className="space-y-4">
                  {responses.map((response, index) => (
                    <div
                      key={response.id}
                      className="p-4 bg-muted rounded-lg border"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1">
                            Question {index + 1}
                          </div>
                          <div className="font-medium mb-2">
                            {formatQuestionKey(response.question_key)}
                          </div>
                          <div className="text-primary font-semibold">
                            {formatAnswerValue(response.answer_value)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminLeadDetail;
