import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, LogOut, Users, CheckCircle, TrendingUp, Clock, Eye, Download } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface QuizLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  is_qualified: boolean;
  qualification_score: number | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading, isDemoMode, signOut, exitDemoMode } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leads, setLeads] = useState<QuizLead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    qualifiedLeads: 0,
    conversionRate: 0,
    recentLeads: 0,
  });

  // Redirect if not authenticated or not admin (unless demo mode)
  useEffect(() => {
    if (!loading && !isDemoMode && (!user || !isAdmin)) {
      navigate("/admin-login");
    }
  }, [user, isAdmin, loading, isDemoMode, navigate]);

  // Fetch leads data
  useEffect(() => {
    if (isDemoMode || (user && isAdmin)) {
      fetchLeads();
    }
  }, [user, isAdmin, isDemoMode]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("quiz_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
        return;
      }

      setLeads(data || []);

      // Calculate metrics
      const total = data?.length || 0;
      const qualified = data?.filter((l) => l.is_qualified).length || 0;
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const recent = data?.filter((l) => new Date(l.created_at) > sevenDaysAgo).length || 0;

      setMetrics({
        totalLeads: total,
        qualifiedLeads: qualified,
        conversionRate: total > 0 ? Math.round((qualified / total) * 100) : 0,
        recentLeads: recent,
      });
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin-login");
  };

  const handleExitDemo = () => {
    exitDemoMode();
    navigate("/admin-login");
  };

  // CSV Export function
  const exportToCSV = () => {
    if (leads.length === 0) {
      toast({
        title: "No Data",
        description: "There are no leads to export.",
        variant: "destructive",
      });
      return;
    }

    const headers = ["Name", "Email", "Phone", "Qualified", "Score", "Status", "Submitted"];
    const csvRows = [
      headers.join(","),
      ...leads.map((lead) =>
        [
          `"${lead.name.replace(/"/g, '""')}"`,
          `"${lead.email.replace(/"/g, '""')}"`,
          `"${(lead.phone || "").replace(/"/g, '""')}"`,
          lead.is_qualified ? "Yes" : "No",
          lead.qualification_score ?? "",
          lead.status.replace("_", " "),
          format(new Date(lead.created_at), "yyyy-MM-dd"),
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `quiz-leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `Exported ${leads.length} leads to CSV.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isDemoMode && (!user || !isAdmin)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-amber-500 text-amber-950 py-2 px-4 text-center text-sm font-medium">
          🎭 Demo Mode Active — Data is read-only from the database
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExitDemo}
            className="ml-4 h-6 text-amber-950 hover:bg-amber-600"
          >
            Exit Demo
          </Button>
        </div>
      )}

      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold uppercase tracking-wide">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-80">
              {isDemoMode ? "demo@taxqueen.com" : user?.email}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={isDemoMode ? handleExitDemo : handleSignOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              {isDemoMode ? "Exit Demo" : "Sign Out"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.totalLeads}</div>
              <p className="text-xs text-muted-foreground">All quiz submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{metrics.qualifiedLeads}</div>
              <p className="text-xs text-muted-foreground">High-value prospects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualification Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">Qualified / Total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last 7 Days</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{metrics.recentLeads}</div>
              <p className="text-xs text-muted-foreground">Recent submissions</p>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="uppercase tracking-wide">Quiz Submissions</CardTitle>
              <CardDescription>
                View and manage all quiz leads
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              disabled={leads.length === 0}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            {loadingLeads ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No quiz submissions yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Qualified</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.phone || "—"}</TableCell>
                        <TableCell>
                          {lead.is_qualified ? (
                            <Badge className="bg-primary">Qualified</Badge>
                          ) : (
                            <Badge variant="secondary">No</Badge>
                          )}
                        </TableCell>
                        <TableCell>{lead.qualification_score ?? "—"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {lead.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(new Date(lead.created_at), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <Link to={`/admin/lead/${lead.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
