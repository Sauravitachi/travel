"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle2, Trees } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

export default function ReviewMasonry() {
  const featuredReviews = REVIEWS.slice(0, 3);

  return (
    <section id="reviews" className="py-28 bg-[#040c07] relative overflow-hidden border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>Real Explorer Chronicles</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Voices From The Trail
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 font-light leading-relaxed">
            From frozen riverbeds to lush rainforest passes, authentic stories from explorers who braved the untamed miles with our crew.
          </p>
        </div>

        {/* 3 Clean Editorial Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-[#07130d] border border-emerald-500/15 p-8 flex flex-col justify-between hover:border-emerald-400/35 transition-all duration-300 shadow-xl shadow-black/40 group"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-mono font-bold text-slate-300">{review.rating}.0</span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-200/90 leading-relaxed font-light italic mb-8">
                  "{review.quote || review.fullReview}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 border-t border-emerald-500/10">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-emerald-500/30">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-sm text-white">{review.author}</span>
                    {review.verifiedExplorer && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <span className="text-[11px] text-emerald-400/80 block">{review.expeditionTaken}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{review.location} • {review.batchDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
