"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const recommendationsSchema = z.object({
  browsingHistory: z.string().min(10, { message: "Please describe your interests or recent browsing (min 10 characters)." }),
});

type RecommendationsFormInputs = z.infer<typeof recommendationsSchema>;

export function ProductRecommendations() {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<RecommendationsFormInputs>({
    resolver: zodResolver(recommendationsSchema),
  });

  const onSubmit: SubmitHandler<RecommendationsFormInputs> = async (data) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const result = await getProductRecommendations({ browsingHistory: data.browsingHistory });
      setRecommendations(result.recommendations);
    } catch (e) {
      console.error("Failed to get recommendations:", e);
      setError("Sorry, we couldn't fetch recommendations at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Need Some Ideas?</CardTitle>
          <CardDescription className="text-center">
            Tell us what you've been looking for or your interests, and we'll suggest some products you might like!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="browsingHistory">Describe your interests or recent browsing:</Label>
              <Textarea
                id="browsingHistory"
                placeholder="e.g., 'Looking for running shoes and sportswear', 'Interested in smart home gadgets', 'Recently viewed classic novels and mystery books'"
                {...register("browsingHistory")}
                className="min-h-[100px]"
                aria-invalid={errors.browsingHistory ? "true" : "false"}
              />
              {errors.browsingHistory && <p className="text-sm text-destructive">{errors.browsingHistory.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Recommendations...
                </>
              ) : (
                "Get Recommendations"
              )}
            </Button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm">
              {error}
            </div>
          )}

          {recommendations && (
            <div className="mt-8">
              <h3 className="text-xl font-headline font-semibold mb-4">Here are some suggestions for you:</h3>
              <div className="p-4 bg-muted/50 border rounded-md whitespace-pre-wrap text-sm leading-relaxed">
                {recommendations}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
