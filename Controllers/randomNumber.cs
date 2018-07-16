using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace LeicaChallenge.Controllers
{
  [Route("api/[Controller]")]
  public class randomNumber : Controller
  {

    [HttpGet("/api/Values/{minValue}/{maxValue}")]
    public ActionResult Values(int minValue, int maxValue)
    {
      RandomGenerator generator = new RandomGenerator();
      int rand = generator.RandomNumber(minValue, maxValue);
      //var response = "some response " + rand.ToString();
      return Json(rand);
    }
  }


  public class RandomGenerator
  {
    // Generate a random number between two numbers  
    public int RandomNumber(int min, int max)
    {
      Random random = new Random();
      return random.Next(min, max);
    }
  }
}

