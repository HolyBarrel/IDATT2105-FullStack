package edu.ntnu.idatt2105.magnulal.demo;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

//SOURCE: https://www.youtube.com/watch?v=s841xbEPg4I
@Component
public class HTTPLogFilter extends OncePerRequestFilter {
  private static final Logger LOGGER = LoggerFactory.getLogger(HTTPLogFilter.class);

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

    ContentCachingRequestWrapper contentCachingRequestWrapper =
        new ContentCachingRequestWrapper(request);
    ContentCachingResponseWrapper contentCachingResponseWrapper =
        new ContentCachingResponseWrapper(response);

    long startTime = System.currentTimeMillis();

    filterChain.doFilter(contentCachingRequestWrapper, contentCachingResponseWrapper);

    long duration = System.currentTimeMillis() - startTime;

    String requestBody = getStringValue(contentCachingRequestWrapper.getContentAsByteArray(),
        request.getCharacterEncoding() );

    String responseBody = getStringValue(contentCachingResponseWrapper.getContentAsByteArray(),
        response.getCharacterEncoding() );

    StringBuilder outSB = new StringBuilder().append("\n\nAction occurred: \n");
    if(!request.getMethod().equals("")) outSB.append("METHOD: ").append(request.getMethod());
    if(!request.getRequestURI().equals("")) outSB.append("\nREQUEST-URI: ").append(request.getRequestURI());
    if(!requestBody.equals("")) outSB.append("\nREQUEST BODY: ").append(requestBody);
    outSB.append("\nRESPONSE CODE: ").append(response.getStatus());
    if(!responseBody.equals("")) outSB.append("\nRESPONSE BODY: ").append(responseBody);
    outSB.append("\nTOT. TIME: ").append(duration).append("ms");

    LOGGER.info(String.valueOf(outSB));

    contentCachingResponseWrapper.copyBodyToResponse();
  }

  private String getStringValue(byte[] contentAsByteArray, String characterEncoding) {
    try {
      return new String(contentAsByteArray, 0, contentAsByteArray.length, characterEncoding);
    } catch (UnsupportedEncodingException e) {
      e.printStackTrace();
    }
    return "";
  }
}
